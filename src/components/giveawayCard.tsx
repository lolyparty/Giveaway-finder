import { useEffect, useState } from "react";
import type { GiveawayCardProps } from "../types";
import { useGiveawayStore } from "../assets/store/useGiveawayStore";

const GiveawayCard = ({
  title,
  description,
  endDate,
  organizer,
  image,
  id,
  reserved,
  claimed,
}: GiveawayCardProps) => {
  const [remaining, setRemaining] = useState(
    new Date(endDate).getTime() - Date.now()
  );
  const reserve = useGiveawayStore((s) => s.reserveGiveaway);
  const reservedArray = useGiveawayStore((s) => s.reserved);
  const claim = useGiveawayStore((s) => s.claimGiveaway);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(new Date(endDate).getTime() - Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const addToReserve = () => {
    if (reserve({ title, description, endDate, organizer, image, id })) {
      alert("Giveaway reserved successfully!");
    } else {
      alert("You can only reserve up to 5 giveaways at a time.");
    }
    console.log("Reserved giveaways:", reservedArray);
  };

  const handleClaim = () => {
    claim(id);
    alert("Giveaway claimed successfully!");
  };

  function formatTime(ms: number): string {
    if (ms <= 0) return "Expired";

    const totalSeconds = Math.floor(ms / 1000);

    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days >= 1) {
      return `${days}d ${hours}h`;
    }

    return `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`;
  }

  return (
    <div id={id}>
      <div className="flex items-center">
        <div className="rounded-full mr-4 flex items-center justify-center">
          <img
            src={`${image}/${id}/75/75`}
            alt="Giveaway Thumbnail"
            className="rounded mr-4"
          />
        </div>
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div>
          <p className="text-sm">{`Ends in ${formatTime(remaining)}`}</p>
          <p className="text-sm font-light mt-1">{organizer}</p>
        </div>
        {!claimed && (
          <button
            onClick={reserved ? handleClaim : addToReserve}
            className=" bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600"
          >
            {reserved ? "Claim" : "Reserve"}
          </button>
        )}
      </div>
    </div>
  );
};

export default GiveawayCard;
