import { useInfiniteQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router-dom";
import { getMovieRecommendationQueryOptions } from "../api/query";
import { motion } from "motion/react";
import { Award, ChevronRight, X } from "lucide-react";
import MediaCard from "@/components/shared/media-card";
import LoadingSpinner from "@/components/shared/loading-spinner";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import EmptyState from "@/components/shared/empty-state";

const MovieRecommendationSection = () => {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");
  const { ref, inView } = useInView();

  const { data, isFetchingNextPage, fetchNextPage, isLoading, status } =
    useInfiniteQuery(getMovieRecommendationQueryOptions(queryId as string));

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Award className="h-6 w-6 mr-3 text-amber-500" />
            You Might Also Like
          </h2>
          <Link
            to="/movies"
            className="flex items-center space-x-1 text-amber-500 hover:text-amber-600 transition-colors group"
          >
            <span>View More</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" text="Loading recommendations..." />
          </div>
        ) : status === "error" ? (
          <EmptyState
            icon={X}
            title="Failed to fetch recommendations"
            description="Check your network connection and try again"
          />
        ) : (
          <>
            <div className="grid auto-rows-fr grid-cols-[repeat(auto-fit,_minmax(150px,_1fr))] gap-6">
              {data?.pages.map((page) =>
                page.results.map((movie, index) => (
                  <motion.div
                    key={`${movie.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <MediaCard type="movie" media={movie} />
                  </motion.div>
                ))
              )}
            </div>
            <div className="mt-4" ref={ref}></div>
            {isFetchingNextPage && <LoadingSpinner text="Loading more..." />}
          </>
        )}
      </div>
    </section>
  );
};

export default MovieRecommendationSection;
