import React, { Component } from 'react';

const Buttons = (props) => {

    const easterEgg = () => {
    
        const root = document.getElementById('root');
        root.classList.add('easter-egg');
        const colorGen = () => {
          const r = Math.floor(Math.random() * 256);
          const g = Math.floor(Math.random() * 256);
          const b = Math.floor(Math.random() * 256);
          return 'rgb(' + r + ',' + g + ',' + b + ')';
        };

        setInterval(() => {
          const elements = document.querySelectorAll('*');
          for (let i = 0; i < elements.length; i += 1) {
            elements[i].style.backgroundColor = `${colorGen()}`;
            elements[i].style.color = `${colorGen()}`;
            elements[i].style.fill = `${colorGen()}`;
          }
        }, 100);
    };

    return ( 
        <div className="button-div">
            <button className="button" onClick={props.pause}> Pause </button>
            <button className="button" onClick={props.playButton}> Resume </button>
            <button className="button" onClick={easterEgg}> Click me! </button>
        </div>
     );
}
 
export default Buttons;