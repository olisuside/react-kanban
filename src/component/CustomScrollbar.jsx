// CustomScrollbar.jsx

import React from 'react';
import '../assets/scrollbar.css'; // Import CSS custom scrollbar

const CustomScrollbar = ({ children }) => {
    return (
        <div className="custom-scrollbar">
            {children}
        </div>
    );
}

export default CustomScrollbar;
