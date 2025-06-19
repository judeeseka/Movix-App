import { motion } from "motion/react";
import { Link } from "react-router-dom";

const CtaSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-amber-500 to-red-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to discover your next favorite movie or TV show?
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of entertainment lovers and start building your
            personal collection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Free
            </Link>
            <Link
              to="/movies"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              Explore Content
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
