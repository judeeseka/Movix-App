import { motion } from "framer-motion";
import { getProfileUrl } from "@/lib/utils";
import type { Cast } from "@/features/movies";

export default function CastCard({ castMember }: { castMember: Cast }) {
  const profileUrl = getProfileUrl(castMember.profile_path, "w185");

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Profile Image */}
      <div className="relative overflow-hidden">
        <img
          src={profileUrl}
          alt={castMember.name}
          className="w-full h-[250px] object-cover transition-transform duration-500 group-hover:scale-110 rounded-t-xl"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 mb-1 group-hover:text-amber-500 transition-colors">
          {castMember.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          as {castMember.character}
        </p>
      </div>
    </motion.div>
  );
}
