'use client';
import { motion } from 'framer-motion';

export default function AuthComponentsWrapper(props: {
    children: React.ReactNode;
}) {
    const { children } = props;
    return (
        <motion.div
            initial={{
                opacity: 0,
                x: -15,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: 15,
            }}
            style={{
                height: '100%',
            }}
        >
            {children}
        </motion.div>
    );
}
