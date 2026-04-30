import React from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-secondary rounded-[40px] p-10 md:p-20 overflow-hidden shadow-2xl">
          {/* Decorative Orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Get the latest pet <span className="text-primary italic font-classic">updates</span> straight to your inbox.
              </h2>
              <p className="text-gray-400 text-lg">
                Join 5,000+ pet lovers and stay updated with new listings, care tips, and success stories.
              </p>
            </div>

            <div className="w-full max-w-md">
              <form className="relative flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-8 py-5 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-all"
                  required
                />
                <button
                  type="submit"
                  className="px-8 py-5 rounded-full bg-primary text-secondary font-bold hover:bg-white transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Subscribe <FaPaperPlane className="text-sm" />
                </button>
              </form>
              <p className="mt-4 text-gray-500 text-sm text-center lg:text-left px-4">
                We respect your privacy. No spam, ever.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
