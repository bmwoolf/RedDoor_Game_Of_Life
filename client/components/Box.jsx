import React from 'react';
import Grid from './Grid.jsx';

const Box = (props) => {
    // have to pass in information from this component
    // selectBox = () => {
    //     props.selectBox(props.row, props.column);
    // };

    selectBox = (props) => {
        props.selectBox(props.row, props.column);
    }

    return ( 
        
        <div 
          className={props.boxClass}
          id={props.key}
          onClick={selectBox}
        >
        </div>
        );
}
 
export default Box;