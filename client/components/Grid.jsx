import React, { Component } from 'react';
import Box from './Box.jsx';

const Grid = (props) => {
    const width = props.columns * 16;
    let rowsArr = [];
    let boxClass = "";

    for (let i = 0; i < props.rows; i++) {
        for (let j = 0; j < props.columns; j++) {
            let boxKey = `${i}-${j}`;
            boxClass = props.entireGrid[i][j] ? 'box on' : 'box off';
            rowsArr.push(
                <Box 
                    boxClass={boxClass}
                    boxId={boxKey}
                    row={i}
                    column={j}
                    colorBox={props.colorBox}
                    go={props.go}
                    value={props.entireGrid[i][j]}
                />
            );
        }
    };

    return ( 
        <div className="grid" style={{width: width}}> 
            {rowsArr}
        </div>
    );
}
 
// class Grid extends Component {
//     render(props) { 
//         const width = props.columns * 14;
//         let rowsArr = [];
//     // change box naming
//         let boxClass = "";
//     //change to map method
//         for (let i = 0; i < props.rows; i++) {
//             for (let j = 0; j < props.columns; j++) {
//                 let boxKey = `${i}-${j}`;
//                 boxClass = props.entireGrid[i][j] ? 'box on' : 'box off';
//                 rowsArr.push(
//                     <Box 
//                         boxClass={boxClass}
//                         key={boxKey}
//                         boxId={boxKey}
//                         row={i}
//                         column={j}
//                         selectBox={props.selectBox}
//                     />
//                 );
//             }
//         }

//         return ( 
//             <div className="grid" style={{width: width}}> 
//                 {rowsArr}
//             </div>
//          );
//     }
// }

export default Grid;