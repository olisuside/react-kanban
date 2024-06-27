import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Modal from './Modal'; // Import the Modal component

const AddCard = ({ column, setCards }) => {
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('low');
    const [division, setDivision] = useState('frontend'); // New state for division
    const [image, setImage] = useState(null); // New state for image
    const [adding, setAdding] = useState(false);
    const [showPriorityOptions, setShowPriorityOptions] = useState(false);
    const [showDivisionOptions, setShowDivisionOptions] = useState(false); // New state for division options

    const handlePriorityClick = () => {
        setShowPriorityOptions(!showPriorityOptions);
    }

    const handlePrioritySelect = (selectedPriority) => {
        setPriority(selectedPriority);
        setShowPriorityOptions(false);
    }

    const handleDivisionClick = () => {
        setShowDivisionOptions(!showDivisionOptions);
    }

    const handleDivisionSelect = (selectedDivision) => {
        setDivision(selectedDivision);
        setShowDivisionOptions(false);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 1048576) { // Limit image size to 1MB
            setImage(file);
        } else {
            alert("File is too large. Please select an image smaller than 1MB.");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!text.trim().length || !priority || !division) {
            return;
        }

        const newCard = {
            id: Date.now().toString(),
            title: text,
            description: description,
            priority: priority,
            division: division, // Add division to new card
            column,
            image
        };

        setCards(cards => [...cards, newCard]);
        setAdding(false);
        setText('');
        setDescription('');
        setPriority('low');
        setDivision('frontend'); // Reset division state
        setImage(null); // Reset image state
    }

    return (
        <>
            <motion.button
                layout
                onClick={() => setAdding(true)}
                className='flex w-full items-center justify-center px-3 pt-1 pb-1 mb-1 mt-1 text-xs bg-gray-900 rounded-lg border border-slate-700 text-neutral-400 transition-colors hover:text-neutral-50'
            >
                <span>Add New Task&nbsp;&nbsp;</span><FiPlus />
            </motion.button>

            <Modal show={adding} onClose={() => setAdding(false)}>
                <motion.form
                    layout
                    onSubmit={handleSubmit}
                    className=''
                >
                    <input
                        className='w-full rounded border border-violet-400 bg-violet-400/20 focus:outline-none p-1 mb-2 text-sm text-neutral-100'
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder='Title'
                    />
                    <textarea
                        rows="4"
                        className='w-full rounded border border-violet-400 bg-violet-400/20 focus:outline-none p-1 text-sm text-neutral-100'
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Description'
                    />

                    <div className="relative w-full group">
                        <label className="text-xs text-gray-400">Priority</label>
                        <div
                            className="py-1 px-3 w-full text-sm text-site bg-violet-400/20 border border-violet-400 focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold"
                            onClick={handlePriorityClick}
                        >
                            {priority === 'low' && 'Low'}
                            {priority === 'medium' && 'Medium'}
                            {priority === 'high' && 'High'}
                        </div>
                        {showPriorityOptions && (
                            <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-full peer-focus:visible peer-focus:opacity-100 opacity-100 visible duration-200 p-1 bg-slate-800 border border-violet-400 text-xs md:text-sm">
                                <div className="w-full block cursor-pointer hover:bg-violet-400/20 text-neutral-100 hover:text-link px-3 py-2 rounded-md" onClick={() => handlePrioritySelect('low')}>Low</div>
                                <div className="w-full block cursor-pointer hover:bg-violet-400/20 text-neutral-100 hover:text-link px-3 py-2 rounded-md" onClick={() => handlePrioritySelect('medium')}>Medium</div>
                                <div className="w-full block cursor-pointer hover:bg-violet-400/20 text-neutral-100 hover:text-link px-3 py-2 rounded-md" onClick={() => handlePrioritySelect('high')}>High</div>
                            </div>
                        )}
                    </div>

                    <div className="relative w-full group">
                        <label className="text-xs text-gray-400">Division</label>
                        <div
                            className="py-1.5 px-3 w-full text-sm text-site bg-violet-400/20 border border-violet-400 focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold"
                            onClick={handleDivisionClick}
                        >
                            {division === 'frontend' && 'Frontend'}
                            {division === 'backend' && 'Backend'}
                            {division === 'uiux' && 'UI/UX'}
                        </div>
                        {showDivisionOptions && (
                            <div className="absolute z-[99] top-[100%] left-[50%] translate-x-[-50%] rounded-md overflow-hidden shadow-lg min-w-[200px] w-full peer-focus:visible peer-focus:opacity-100 opacity-100 visible duration-200 p-1 bg-slate-800 border border-violet-400 text-xs md:text-sm">
                                <div className="w-full block cursor-pointer hover:bg-violet-400/20 text-neutral-100 hover:text-link px-3 py-2 rounded-md" onClick={() => handleDivisionSelect('frontend')}>Frontend</div>
                                <div className="w-full block cursor-pointer hover:bg-violet-400/20 text-neutral-100 hover:text-link px-3 py-2 rounded-md" onClick={() => handleDivisionSelect('backend')}>Backend</div>
                                <div className="w-full block cursor-pointer hover:bg-violet-400/20 text-neutral-100 hover:text-link px-3 py-2 rounded-md" onClick={() => handleDivisionSelect('uiux')}>UI/UX</div>
                            </div>
                        )}
                    </div>
                        
                    <input
                        type="file" accept="image/*"
                        className='w-full rounded border border-violet-400 bg-violet-400/20 focus:outline-none p-1 text-sm mt-2 text-neutral-100'
                        onChange={handleImageChange}
                    />

                    <div className="flex mt-1.5 items-center justify-end gap-1.5">
                        <motion.button
                            layout
                            type='submit'
                            className='gap-1.5 px-3 py-1.5 text-xs text-neutral-700 rounded-md bg-neutral-200 transition-colors hover:bg-neutral-50'
                        >
                            Add
                        </motion.button>
                        <motion.button
                            layout
                            onClick={() => setAdding(false)}
                            className='gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
                        >
                            Close
                        </motion.button>
                    </div>
                </motion.form>
            </Modal>
        </>
    );
}

export default AddCard;
