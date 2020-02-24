import React, { useEffect } from 'react';
import Grid from './Grid.jsx';

const Box = (props) => {
    // let boxClass = props.boxClass;
    // useEffect(() => {
    //     console.log('inside useEffect')
    //     if (props.value === 1) {
    //         boxClass = 'on';
    //     } else {
    //         boxClass = 'off';
    //     }
    // }, [])
    // create a local function to invoke colorBox() with multiple args
    function color() {
        console.log('color')
        props.colorBox(props.row, props.column);
        props.play2() // this cancels out the coloring functionality
        console.log('boxClass', props.boxClass)
    }

    // check the value of the box, and we'll check the value here if 0 or 1, change it here
    // props.value
    // function checkNumber() {
    //     if (props.value === 1) {
    //         boxClass = 'on';
    //     } else {
    //         boxClass = 'off';
    //     }
    // }

    return ( 
        <div 
          className={props.boxClass}
        //   className={boxClass}
          id={props.key}
          onClick={() => color()}
        >
        </div>
        );
}
 
export default Box;