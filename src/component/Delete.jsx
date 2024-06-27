import React, { useState } from 'react'
import { FaTrash } from 'react-icons/fa';
import { HiRocketLaunch } from 'react-icons/hi2';


const Delete = ({ setCards }) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setActive(true);
    }
    
    const handleDragLeave = () => {
        setActive(false);
    }

    const handleDragEnd = (e) => {
        const cardId = e.dataTransfer.getData('cardId');
        console.log(cardId);
       
        setCards(cards => cards.filter(card => card.id !== cardId));
        setActive(false);
    }
    return (
        <div onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={`mt-12 grid h-[50vh] w-56 shrink-0 place-content-center rounded-xl border text-3xl ${active ? 'border-red-800 bg-red-800/30 text-red-500' : 'bg-gray-900/80 border-slate-400/80 text-slate-100/50'}`}>
            {active ? <HiRocketLaunch className='animate-bounce' /> : <FaTrash  />}
        </div>
    )
}

export default Delete