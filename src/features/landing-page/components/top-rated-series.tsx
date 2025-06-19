import MediaCard from "@/components/shared/media-card";
import type { MovieData } from "@/types/types";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

const TopRatedSeries = ({
  topRatedSeriesData,
}: {
  topRatedSeriesData: MovieData["data"] | undefined;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const scrollAmount = container.offsetWidth / 1.2;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Star className="h-6 w-6 text-amber-500" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top Rated TV Shows
            </h2>
          </div>
          <Link
            to="/tv?sort=top_rated"
            className="flex items-center space-x-1 text-amber-500 hover:text-amber-600 transition-colors group"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative">
          {/* Arrows */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-6 lg:-left-8 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full text-white transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-6 lg:-right-8 top-1/2 transform -translate-y-1/2 z-20 p-3 backdrop-blur-sm bg-black/30 hover:bg-black/50 rounded-full text-white transition-all duration-200 cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 text-gray-700 dark:text-white" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="grid grid-flow-col auto-cols-[230px] gap-6 overflow-x-scroll scroll-smooth transition-all scrollbar-none py-2"
          >
            {topRatedSeriesData?.results.map((movie) => (
              <MediaCard type="tv" media={movie} key={movie.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopRatedSeries;
