import React from 'react';
import Grid from './Grid.jsx';

const Box = (props) => {
    // create a local function to invoke colorBox() with multiple args
    function color() {
        console.log('color')
        props.colorBox(props.row, props.column);
        props.play2() // this cancels out the coloring functionality
    }
    return ( 
        <div 
          className={props.boxClass}
          id={props.key}
          onClick={() => color()}
        >
        </div>
        );
}
 
export default Box;