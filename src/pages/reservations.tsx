import { useGiveawayStore } from "../assets/store/useGiveawayStore";
import GiveawayCard from "../components/giveawayCard";

const ReservationsPage = () => {
  const reserved = useGiveawayStore((s) => s.reserved);
  const claimed = useGiveawayStore((s) => s.claimed);
  return (
    <div className="py-2">
      <h1 className="text-center text-2xl font-bold mt-2">Reservations</h1>
      <div>
        <p className="text-center text-gray-600 my-2">
          Here you can find all the giveaways you have reserved. Click on a
          giveaway and claim it.
        </p>
        {reserved.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            You have no reservations{" "}
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center py-4 mt-2">
            {reserved.map((giveaway) => (
              <div className="bg-white py-4 px-8 rounded-lg shadow-md inset-shadow-2xs w-9/12">
                <GiveawayCard
                  key={giveaway.id}
                  title={giveaway.title}
                  description={giveaway.description}
                  endDate={giveaway.endDate}
                  organizer={giveaway.organizer}
                  image={giveaway.image}
                  id={giveaway.id}
                  reserved={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="pt-4">
        <h2 className="text-center text-2xl font-bold mt-2">
          Claimed Giveaways
        </h2>
        {claimed.length === 0 ? (
          <p className="text-center text-gray-600 mt-4">
            You have no claimed Giveaways
          </p>
        ) : (
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center py-4 mt-2">
              {claimed.map((giveaway) => (
                <div className="bg-white py-4 px-8 rounded-lg shadow-md inset-shadow-2xs w-9/12">
                  <GiveawayCard
                    key={giveaway.id}
                    title={giveaway.title}
                    description={giveaway.description}
                    endDate={giveaway.endDate}
                    organizer={giveaway.organizer}
                    image={giveaway.image}
                    id={giveaway.id}
                    claimed={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReservationsPage;
