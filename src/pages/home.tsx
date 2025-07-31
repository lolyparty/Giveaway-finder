import { useEffect, useRef, useState } from "react";
import GiveawayCard from "../components/giveawayCard";
import type { GiveawayCardProps } from "../types";
import { useGiveawayStore } from "../assets/store/useGiveawayStore";

const Home = () => {
  const [giveaways, setGiveaways] = useState<GiveawayCardProps[]>([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const visibleGiveaways = giveaways.slice(0, visibleCount);
  const reserved = useGiveawayStore((s) => s.reserved);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      setTimeout(async () => {
        try {
          const res = await fetch("/src/data/giveaways.json");
          const data = await res.json();
          setGiveaways(data.content);
          // setVisibleGiveaways(data.content.slice(0, 10));
          setLoading(false);
        } catch (error) {
          console.error("Error fetching giveaways:", error);
          setLoading(false);
        }
      }, 500);
    };

    fetchData();
  }, []);

  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount((prev) => {
          const next = prev + 10;
          return next <= giveaways.length ? next : prev;
        });
      }
    });

    if (lastItemRef.current) {
      observer.observe(lastItemRef.current);
    }

    return () => {
      if (lastItemRef.current) observer.disconnect();
    };
  }, [visibleCount, giveaways]);

  return (
    <div className="mt-4">
      <h1 className="text-center text-2xl font-bold">Active Giveaways</h1>
      <div className="max-w-4xl mx-auto p-4 mb-4">
        <p className="text-center text-gray-600">
          Here you can find all the active giveaways. Click on a giveaway to
          view more details and participate.
        </p>
      </div>
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 justify-items-center pb-4">
          {visibleGiveaways.map((giveaway, index) => {
            const isLast = index === visibleGiveaways.length - 1;
            return (
              <div
                className="bg-white py-4 px-8 rounded-lg shadow-md inset-shadow-2xs w-9/12"
                ref={isLast ? lastItemRef : null}
                key={giveaway.id}
              >
                <GiveawayCard
                  key={giveaway.id}
                  title={giveaway.title}
                  description={giveaway.description}
                  endDate={giveaway.endDate}
                  organizer={giveaway.organizer}
                  image={giveaway.image}
                  id={giveaway.id}
                  reserved={reserved.some((g) => g.id === giveaway.id)}
                />
              </div>
            );
          })}
        </div>
        {loading && (
          <div className="w-full flex justify-center">
            <span className="align-middle inline-block loader h-6 w-6 my-2 mx-auto"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
