import { motion } from 'framer-motion';


export function WavingBall() {
    return (
        <motion.div
            className="p-10 shadow-2xl"
            animate={{
                background: [
                    'radial-gradient(circle at center,#9bf8f4, #6f7bf7)',
                    'radial-gradient(circle at center,#9bafd9, #103783)',
                    'radial-gradient(circle at center,#919bff, #133a94)',
                ],
                scale: [1, 1.5, 1.5, 1, 1],
                rotate: [0, 0, 270, 270, 0],
                borderRadius: ["20%", "20%", "50%", "50%", "20%"],
            }}
            transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
            }}
        >
        </motion.div>
    );
}