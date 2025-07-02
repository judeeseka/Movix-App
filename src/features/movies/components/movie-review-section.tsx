import { motion } from "motion/react";
import { Star, Users, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMovieReviewQueryOptions } from "../api/query";
import LoadingSpinner from "@/components/common/loading-spinner";
import EmptyState from "@/components/common/empty-state";

const MovieReviewSection = () => {
  const [searchParams] = useSearchParams();
  const queryId = searchParams.get("id");

  const { data, isFetchingNextPage, fetchNextPage, isLoading, status } =
    useInfiniteQuery(getMovieReviewQueryOptions(queryId as string));

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="h-6 w-6 mr-3 text-amber-500" />
            User Reviews
          </h2>
          <button className="text-amber-500 hover:text-amber-600 transition-colors">
            Write a Review
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <LoadingSpinner size="lg" text="Loading recommendations..." />
          </div>
        ) : status === "error" ? (
          <EmptyState
            icon={X}
            title="Failed to fetch reviews"
            description="Check your network connection and try again"
          />
        ) : (
          <>
            <div className="space-y-6">
              {data?.pages.map((page) =>
                page.results.length > 0 ? (
                  page.results.map((review) => (
                    <motion.div
                      key={review.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {review.author.charAt(0) || "U"}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {review.author || "Anonymous"}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              @{review.author_details?.username}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.author_details.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              fill={
                                star <= review.author_details.rating
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {review.content}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                        {new Date(review.created_at).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-900 dark:text-white">
                    No reviews yet
                  </p>
                )
              )}
            </div>
            {data?.pages[0].total_pages && data?.pages[0].total_pages > 1 ? (
              <button
                className="flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-red-500 text-white p-4 rounded-full font-semibold hover:shadow-lg transition-all duration-200 mt-4 mx-auto"
                onClick={() => fetchNextPage()}
              >
                More Reviews
              </button>
            ) : (
              <></>
            )}

            {isFetchingNextPage && (
              <LoadingSpinner text="Loading more reviews..." />
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default MovieReviewSection;
