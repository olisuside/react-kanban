import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DropIndicator from './DropIndicator';
import EditCard from './EditCard';
import { FaPencil } from 'react-icons/fa6';

const Card = ({ title, id, description, column, priority, division, image, handleDragStart, setCards }) => {
    const [isEditing, setIsEditing] = useState(false);

    const priorityColor = () => {
        return priority === 'low' ? 'bg-green-500/90 text-white' :
            priority === 'medium' ? 'bg-yellow-400/90 text-white' :
                priority === 'high' ? 'bg-red-500 text-white' :
                    '';
    };

    const divisionColor = () => {
        return division === 'frontend' ? 'bg-blue-500 text-white' :
            division === 'backend' ? 'bg-purple-400 text-white' :
                division === 'uiux' ? 'bg-pink-500 text-white' :
                    '';
    };

    return (
        <>
            <DropIndicator beforeId={id} column={column} />
            <motion.div
                layout
                layoutId={id}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                onDragStart={(e) => handleDragStart(e, { title, id, description, column, priority, division })}
                draggable='true'
                className="cursor-grab rounded-lg border border-slate-700 bg-slate-900/80 p-3 active:cursor-grabbing"
            >
                <div className="flex flex-row justify-between text-wrap">
                    <p className="text-sm text-slate-100">{title}</p>
                    <button
                        className='ml-2 px-2 py-1 max-h-5 text-xs text-neutral-100 rounded-xl bg-slate-700 transition-colors hover:bg-slate-500'
                        onClick={() => setIsEditing(true)}
                    >
                        <FaPencil size={10} />
                    </button>
                </div>
                {image && (
                    <img src={URL.createObjectURL(image)} loading='lazy' alt={title} className="my-2 rounded-lg" />
                )}
                <p className="text-sm text-slate-400 text-balance">{description}</p>
                <p className={`inline-block mt-2 px-2  text-xs text-slate-500 rounded-xl ${priorityColor()}`}>{priority}</p>
                <p className={`inline-block mt-2 ml-2 px-2 text-xs text-slate-500 rounded-xl ${divisionColor()}`}>{division}</p>
            </motion.div>

            <EditCard
                id={id}
                title={title}
                description={description}
                priority={priority}
                division={division}
                image={image} // Pass the image prop
                setCards={setCards}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
            />
        </>
    );
};

export default Card;
