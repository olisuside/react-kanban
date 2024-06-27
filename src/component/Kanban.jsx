import React from 'react';
import Board from './Board';
import pattern from '../assets/patern4.jpg'; // Impor gambar pola

const Kanban = () => {
  return (
    <div className='h-screen w-full bg-contain bg-center bg-repeat' style={{ backgroundImage: `url(${pattern})` }}>
      <div className='text-slate-50 flex justify-center items-center h-screen w-full bg-stone-900/50'>
        <Board />
      </div>
    </div>
  );
};

export default Kanban;
