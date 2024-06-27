import React, { useState } from 'react'
import Column from './Column';
import Delete from './Delete';
import images from '../assets/ufo-svgrepo-com.svg'
import CustomScrollbar from './CustomScrollbar';

const DEFAULT_CARDS = [
    {
        id: '1',
        title: 'Design Landing Page',
        description: 'Create wireframes and mockups for the new landing page design.',
        column: 'pending',
        priority: 'low',
        division: 'uiux'  // Added division UI/UX
    },
    {
        id: '2',
        title: 'Implement Navbar Component',
        description: 'Develop and integrate the navbar component with responsive design.',
        column: 'pending',
        priority: 'medium',
        division: 'frontend'  // Added division Frontend
    },
    {
        id: '3',
        title: 'Optimize Images',
        description: 'Compress and optimize images for better performance on the website.',
        column: 'pending',
        priority: 'high',
        division: 'backend'  // Added division Backend
    },
    {
        id: '4',
        title: 'Refactor CSS',
        description: 'Refactor existing CSS code to improve maintainability and readability.',
        column: 'todo',
        priority: 'medium',
        division: 'frontend'  // Added division Frontend
    },
    {
        id: '5',
        title: 'Fix Mobile Menu Bug',
        description: 'Investigate and fix the bug causing issues with the mobile menu.',
        column: 'in-progress',
        priority: 'high',
        division: 'frontend'  // Added division Frontend
    },
    {
        id: '6',
        title: 'Implement Contact Form Validation',
        description: 'Implement client-side validation for the contact form inputs.',
        column: 'in-progress',
        priority: 'medium',
        division: 'uiux'  // Added division UI/UX
    },
    {
        id: '7',
        title: 'Deploy Website to Production',
        description: 'Prepare and deploy the website to the production server.',
        column: 'done',
        priority: 'low',
        division: 'backend'  // Added division Backend
    },
    {
        id: '8',
        title: 'Write Unit Tests',
        description: 'Write unit tests for critical components and functions in the codebase.',
        column: 'done',
        priority: 'medium',
        division: 'frontend'  // Added division Frontend
    }
];


const Board = () => {
    const [cards, setCards] = useState(DEFAULT_CARDS);
    console.log(cards)
    return (<>
        <div className='flex flex-col h-full overflow-hidden px-4 pb-4 pt-6 xl:justify-center'>
            <div className="flex flex-row justify-center items-center py-2 mb-6 rounded-md bg-gray-900/80">
                <img src={images} className="w-10 h-8 mx-2  mb-1" alt="" />
                <h1 className="text-2xl font-bold text-center text-white ">KANBAN BOARD</h1>
                <img src={images} className="w-10 h-8 mx-2 mb-1 " alt="" />
            </div>
            <CustomScrollbar>

                <div className='flex h-full w-full gap-3 xl:justify-center'>
                    <Column title='Pending' column='pending' headingColor='text-red-500' cards={cards} setCards={setCards} key='pending' />
                    <Column title='Todo' column='todo' headingColor='text-yellow-500' cards={cards} setCards={setCards} key='todo' />
                    <Column title='In Progress' column='in-progress' headingColor='text-green-500' cards={cards} setCards={setCards} key='in-progress' />
                    <Column title='Done' column='done' headingColor='text-blue-500' cards={cards} setCards={setCards} key='done' />
                    <Delete setCards={setCards} />
                </div>
            </CustomScrollbar>
        </div>
    </>
    )
}

export default Board