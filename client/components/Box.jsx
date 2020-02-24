import React, { useEffect } from 'react';
import Grid from './Grid.jsx';

const Box = (props) => {
    
    // create a local function to invoke colorBox() with multiple arguments
    function color() {
        props.colorBox(props.row, props.column);
        props.go();
    };

    return ( 
        <div 
          className={props.boxClass}
          id={props.key}
          onClick={() => color()}
        ></div>
    );
};
 
export default Box;