import React, { useState } from  "react";
import './assets/styles.scss';
import produce from 'immer';

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
    
    const [running, setRunning] = useState(false);

    const runningRef = useRef();
    const runningRef = useRef(running);
    runningRef.current = running;

    

    return (
        <React.Fragment>
            {/* instead of having a button, we want to change it to clicking on the actual board */}
            <button
                onClick={() => {
                    setRunning(!running);
                }}
            >{running ? "start" : "start"}</button>


            <div style={{display: "grid", gridTemplateColumns: `repeat(${cellColumns}, 20px)`}}>
                {grid.map((rows, i) => 
                    rows.map((col, j) => (<div 
                    key={`${i}-${j}`}
                    onClick={() => {
                        console.log(`${i}-${j}`)

                        // create a copy of the grid to mutate
                        const newGrid = produce(grid, gridCopy => {
                            gridCopy[i][j] = grid[i][j] ? 0 : 1;
                        });

                        // basically change state
                        setGrid(newGrid)
                    }}
                    style={{
                        width: 20, 
                        height: 20,
                        backgroundColor: grid[i][j] ? 'blue' : undefined,
                        border: "1px solid black"
                    }}/>
                )))}
            </div>
        </React.Fragment>
    );
}

 
export default App;