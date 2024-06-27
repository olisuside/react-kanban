import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from './Modal';

const EditCard = ({ id, title, description, priority, division, image, setCards, isEditing, setIsEditing }) => {
    const [newTitle, setNewTitle] = useState(title);
    const [newDescription, setNewDescription] = useState(description);
    const [newPriority, setNewPriority] = useState(priority);
    const [newDivision, setNewDivision] = useState(division); // New state for division
    const [newImage, setNewImage] = useState(image); // New state for image
    const [showPriorityOptions, setShowPriorityOptions] = useState(false);
    const [showDivisionOptions, setShowDivisionOptions] = useState(false); // New state for division options

    const handlePriorityClick = () => {
        setShowPriorityOptions(!showPriorityOptions);
    };

    const handlePrioritySelect = (selectedPriority) => {
        setNewPriority(selectedPriority);
        setShowPriorityOptions(false);
    };

    const handleDivisionClick = () => {
        setShowDivisionOptions(!showDivisionOptions);
    };

    const handleDivisionSelect = (selectedDivision) => {
        setNewDivision(selectedDivision);
        setShowDivisionOptions(false);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 2097152) { // Limit image size to 2MB
            setNewImage(file);
        } else {
            alert("File is too large. Please select an image smaller than 2MB.");
        }
    };

    const handleSave = () => {
        if (!newTitle.trim()) return;
        setCards(cards => cards.map(card => 
            card.id === id ? { ...card, title: newTitle, description: newDescription, priority: newPriority, division: newDivision, image: newImage } : card
        ));
        setIsEditing(false);
    };

    return (
        <Modal show={isEditing} onClose={() => setIsEditing(false)}>
            <div className="space-y-2">
                <input
                    className='w-full rounded border border-violet-400 bg-violet-400/20 focus:outline-none p-1 text-sm text-neutral-100'
                    value={newTitle}
                    onChange={e => setNewTitle(e.target.value)}
                    placeholder='Title' required
                />
                <textarea rows="4"
                    className='w-full rounded border border-violet-400 bg-violet-400/20 focus:outline-none p-1 text-sm text-neutral-100'
                    value={newDescription}
                    onChange={e => setNewDescription(e.target.value)}
                    placeholder='Description'
                />
                <div className="relative w-full group">
                    <label className="text-xs text-gray-400">Priority</label>
                    <div
                        className="py-1.5 px-3 w-full text-sm text-site bg-violet-400/20 border border-violet-400 focus:border-brand focus:outline-none focus:ring-0 peer flex items-center justify-between rounded font-semibold"
                        onClick={handlePriorityClick}
                    >
                        {newPriority === 'low' && 'Low'}
                        {newPriority === 'medium' && 'Medium'}
                        {newPriority === 'high' && 'High'}
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
                        {newDivision === 'frontend' && 'Frontend'}
                        {newDivision === 'backend' && 'Backend'}
                        {newDivision === 'uiux' && 'UI/UX'}
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
                    className='w-full rounded border border-violet-400 bg-violet-400/20 focus:outline-none p-1 text-sm text-neutral-100'
                    onChange={handleImageChange}
                />
                {newImage && (
                    <div className="text-xs text-neutral-100 mt-2">
                        Selected file: {newImage.name}
                    </div>
                )}
                <div className="flex justify-end gap-2">
                    <button
                        className='px-3 py-1 text-xs text-neutral-700 rounded-md bg-neutral-200 transition-colors hover:bg-neutral-50'
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className='px-3 py-1 text-xs text-neutral-400 transition-colors hover:text-neutral-50'
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default EditCard;
