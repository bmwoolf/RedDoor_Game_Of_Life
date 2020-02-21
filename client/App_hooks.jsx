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

    // const runningRef = useRef();
    const runningRef = useRef(running);
    runningRef.current = running;

    const countNeighbors = (grid, x, y) => {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
            for (let j = -1; j < 2; j++) {
                let col = (x + i + cols) % cols;
                let row = (y + j + rows) % rows;
                sum += grid[col][row]; 
            }
        }
        sum -= grid[x][y];
        return sum;
    }

    // recursive function: break if running is false, meaning it has stopped
    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }

        // basically now we can update the copygrid (like a virtual DOM) and then change the state of the grid
        setGrid((element) => {
            // gridCopy will be updated then the grid will follow
            return produce(element, gridCopy => {
                // implement rules
                for (let i = 0; i < cellRows; i++) {
                    for (let j = 0; j < cellColumns; j++) {
                        // compute neighbors
                        let neighbors = countNeighbors(grid, i, j);
                        let currentCell = gridCopy[i][j];

                        // rule 1
                        if (currentCell == 0 && neighbors == 3) {
                            // create new copy grid with the updated pixel === 1

                        }
                        // rule 2
                        else if (currentCell == 1 && (neighbors < 2 || neighbors > 3)) {
                            // create new copy grid with the updated pixel === 0
                        }
                        // rule 3
                        else {
                            // copy grid is the same and contains currentCell
                        }
                    }
                }

            })
        })

        const newGrid = produce();

        // simulate
        setTimeout(runSimulation, 1000);
    }, [])

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