import React, { useState } from  "react";
import './assets/styles.scss';
import {produce} from 'immer';

const cellRows = 100;
const cellColumns = 100;

const App = () => {  
    
    // create the grid
    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < cellRows; i++) {
            rows.push(Array.from(Array(cellColumns), () => {
                return 0;
            })) //figure out a different way to create the rows
        }
        return rows;
    });
    console.log('grid', grid)
    
    return (
    <div style={{display: "grid", gridTemplateColumns: `repeat(${cellColumns}, 20px)`}}>
        <h1> in here</h1>
        {grid.map((rows, i) => 
            rows.map((col, j) => (<div 
            key={`${i}-${j}`}
            style={{
                width: 20, 
                height: 20,
                backgroundColor: grid[i][j] ? 'blue' : undefined,
                border: "1px solid black"
            }}/>
        )))}
    </div>
    );
}

 
export default App;