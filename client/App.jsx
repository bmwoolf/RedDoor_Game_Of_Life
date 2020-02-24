import React, { Component } from  "react";
import Grid from './components/Grid.jsx';
import Box from './components/Box.jsx';
import './assets/styles.scss';

class App extends Component {
    constructor(props) {
      super(props);
      this.speed = 100;
      this.rows = 50;
      this.columns = 70;
    
      this.state = {
          generation: 0,
          entireGrid: Array(this.rows).fill().map(() => Array(this.columns).fill(0))
      }
      this.colorBox = this.colorBox.bind(this); 
      this.random = this.random.bind(this);
      this.play2 = this.play2.bind(this);
      this.aliveNeighbors = this.aliveNeighbors.bind(this);
    }

    // onClick, we want to fill the individual boxes 
    colorBox(row, col) {
        let mirrorGrid = [...this.state.entireGrid];

        // find the square that was clicked, and set it to its opposite
        mirrorGrid[row][col] = !mirrorGrid[row][col];

        this.setState({
            entireGrid: mirrorGrid
        });
    };

    // generate random spots on the grid to start the game (cannot start wwith just one cell)
    random() {
        console.log('random happened')
        let mirrorGrid = [...this.state.entireGrid];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (Math.floor(Math.random() * 9) == 1) {
                    mirrorGrid[i][j] = 1;
                }
            }
        }
        this.setState({
            entireGrid: mirrorGrid
        })
    };
    
    play2() {
        let mirrorGrid = [...this.state.entireGrid];
        for (let i = 0; i < mirrorGrid.length; i++) {
            for (let j = 0; j < mirrorGrid[i].length; j++) {
                let liveCells = this.aliveNeighbors(mirrorGrid, i, j);
                // if the cell is alive and underpopulation (< 2) or overpopulation (> 3)
                if (mirrorGrid[i][j] === 1 && (liveCells < 2 || liveCells > 3)) {
                    mirrorGrid[i][j] = 0; 
                  } 
                // if the cell is dead and there are three live surrounding, resurrect
                else if (mirrorGrid[i][j] === 0 && liveCells === 3) {
                  mirrorGrid[i][j] = 1; 
                }
            }
        }

        // looping through again
        // for (let i = 0; i < mirrorGrid.length; i++) {
        //     for (let j = 0; j < mirrorGrid[i].length; j++){
        //         // current box mod 2
        //         // input 2 -> 0, input 3 -> 1
        //       mirrorGrid[i][j] %= 2;

        //       if(mirrorGrid[i][j] === 1)
        //         this.colorBox()
                
        //     }
        //   }
          this.setState({
            entireGrid: mirrorGrid,
            generation: this.state.generation + 1
          })

        //   for (let i = 0; i < mirrorGrid.length; i++) {
        //         for (let j = 0; j < mirrorGrid[i].length; j++){
        //             // current box mod 2
        //             // input 2 -> 0, input 3 -> 1
        //         //   mirrorGrid[i][j] %= 2;
    
        //           if(mirrorGrid[i][j] === 1)
        //             this.colorBox()
                    
        //         }
        //       }
    }

    // to count how maney neighbors are surrounding the cell
    aliveNeighbors(board, i, j) {
        let count = 0;
        let indexes = [[1, -1], [1, 0], [1, 1], [0, -1], [0, 1], [-1, -1], [-1, 0], [-1, 1]];
        for (let index of indexes) {
            if (index[0] + i < 0 || index[0] + i > board.length - 1 ||
            index[1] + j < 0 || index[1] + j > board[0].length - 1) continue;
            if (board[index[0] + i][index[1] + j] === 1 ||
            board[index[0] + i][index[1] + j] === 2) count++;
        }
        return count;
    }

    // to make the game actually start
        playButton() {
            clearInterval(this.intervalId);
            this.intervalId = setInterval(this.play2, this.speed);
        };

    // after the component (grid) mounts, we want to invoke random to test the grid
    componentDidMount() {
        this.random();
        this.playButton();
    };

    render() {
      return (
        <div>
            <h1> The Game of Life </h1>
            <Grid
                entireGrid={this.state.entireGrid} 
                rows={this.rows}
                columns={this.columns}
                colorBox={this.colorBox}
                play2={this.play2}
            />
            <h2> Generation: {this.state.generation} </h2>
        </div>
      );
    }
  }
  
  export default App;

  // count the neighbors
    // countNeighbors(grid, x, y) {
    //     let sum = 0;
    //     console.log('x', x);
    //     console.log('y', y)
    //     for (let i = -1; i < 2; i++) {
    //         for (let j = -1; j < 2; j++) {
    //             let row = (y + j + this.rows) % this.rows; // change to this.rows
    //             let col = (x + i + this.columns) % this.columns; // change to this.columns
    //             console.log('this.columns', this.columns)
    //             console.log('this.rows', this.rows)
    //             console.log('col in countNeighbors', col)
    //             console.log('row in countNeighbors', row)
    //             console.log('grid[row][col] in countNeighbors', grid[row][col])
    //             sum += grid[row][col]; 
    //         }
    //     }
    //     sum -= grid[x][y];
    //     return sum;
    // }
    
    // main function for the game- want to eventually do this onClick from Box
    // play() {      
    //     // change the squares on the clone- set state using the clone
    //     console.log('this.state.entireGrid',this.state.entireGrid)

    //     // why can i not access this.state.entireGrid when calling playButton?
    //     let g2 = [...this.state.entireGrid]
    //     console.log('g2', g2)
        
    //     for (let i = 0; i < this.rows; i++) {
    //         for (let j = 0; j < this.columns; j++) {
    //             // we're at the individual level now
    //             let individual = g2[i][j];
    //             let neighbors = this.countNeighbors(g2, i, j); // returns a sum, which is the count of neighbors
    //             console.log('outside of countNeighbors call in play()')
    //             // rule 1
    //             if (individual == 0 && neighbors == 3) {
    //                 g2[i][j] = 1;
    //             } 
    //             // rule 2 & 3
    //             else if (individual == 1 && (neighbors < 2 || neighbors > 3)) {
    //                 g2[i][j] = 0;
    //             } 
    //             // rule 4
    //             else {
    //                 g2[i][j] = individual;
    //             }
    //         }
    //     }
    //     // reassign value of grid in state to g2 
    //     // is this in the correct spot?
    //     this.setState({
    //         entireGrid: g2,
    //         generation: this.state.generation + 1
    //     });
    // };
    
    // play2() {   
    //     console.log('in here')
    //     let grid1 = this.state.entireGrid;
    //     // why can i not access this.state.entireGrid when calling playButton?
    //     let grid2 = [...this.state.entireGrid]
        
    //     for (let i = 0; i < this.rows; i++) {
    //         for (let j = 0; j < this.columns; j++) {
    //             let count = 0;
    //             if (i > 0) if (grid1[i - 1][j]) count++;
    //             if (i > 0 && j > 0) if (grid1[i - 1][j - 1]) count++;
    //             if (i > 0 && j < this.cols - 1) if (grid1[i - 1][j + 1]) count++;
    //             if (j < this.cols - 1) if (grid1[i][j + 1]) count++;
    //             if (j > 0) if (grid1[i][j - 1]) count++;
    //             if (i < this.rows - 1) if (grid1[i + 1][j]) count++;
    //             if (i < this.rows - 1 && j > 0) if (grid1[i + 1][j - 1]) count++;
    //             if (i < this.rows - 1 && j < this.cols - 1) if (grid1[i + 1][j + 1]) count++;
    //             if (grid1[i][j] && (count < 2 || count > 3)) grid2[i][j] = false;
    //             if (!grid1[i][j] && count === 3) grid2[i][j] = true;
    //         }
    //     }
        
    //     this.setState({
            // entireGrid: grid2,
            // generation: this.state.generation + 1
    //     });
    // }