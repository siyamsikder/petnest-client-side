import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-base-100/50 backdrop-blur-sm fixed inset-0 z-[9999]">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
                className="relative flex items-center justify-center"
            >
                {/* Main Spinner Ring */}
                <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>

                {/* Inner Pulse Circle */}
                <div className="absolute w-12 h-12 bg-primary/10 rounded-full animate-ping"></div>

                {/* Center dot/logo placeholder */}
                <div className="absolute w-2 h-2 bg-primary rounded-full"></div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
            >
                <span className="text-lg font-medium tracking-widest uppercase text-primary animate-pulse">
                    Loading
                </span>
                <div className="flex gap-1 mt-1">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></span>
                </div>
            </motion.div>
        </div>
    );
};

export default LoadingSpinner;
