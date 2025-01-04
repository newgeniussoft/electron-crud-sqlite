import React from 'react';
import './TitleBar.css';

const TitleBar = () => {
  return (
    <div className="titlebar">
      <div className="titlebar-title">CRUD App with Custom Title Bar</div>
      <div className="titlebar-buttons">
        <button 
          className="titlebar-button" 
          onClick={() => window.electron.minimizeWindow()}
        >
          &#x2014;
        </button>
        <button 
          className="titlebar-button" 
          onClick={() => window.electron.maximizeWindow()}
        >
          &#x2610;
        </button>
        <button 
          className="titlebar-button" 
          onClick={() => window.electron.closeWindow()}
        >
          &#x2715;
        </button>
      </div>
    </div>
  );
};

export default TitleBar;
