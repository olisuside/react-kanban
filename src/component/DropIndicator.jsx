import React from 'react'


const DropIndicator = ({ beforeId, column }) => {
    return (
      <div data-before={beforeId || '-1'} data-column={column} className='my-px h-0.5 w-full bg-violet-500 opacity-0' />
    )
}


export default DropIndicator