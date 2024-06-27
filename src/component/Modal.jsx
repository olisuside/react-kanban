import React from 'react';
import { motion } from 'framer-motion';

const Modal = ({ show, onClose, children }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <motion.div
                className="bg-slate-900 rounded-lg p-6 w-full max-w-md mx-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
            >
                <button
                    className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-50"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </motion.div>
        </div>
    );
};

export default Modal;
