import React from 'react';
import { m as motion } from 'framer-motion';

const AnimatedSection = ({ children, delay = 0, className = "" }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, ease: "easeOut", delay }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default AnimatedSection;
