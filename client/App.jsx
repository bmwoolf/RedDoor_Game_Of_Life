import React, { Component } from  "react";
import Grid from './components/Grid.jsx';
import Buttons from './components/Buttons.jsx';
import Box from './components/Box.jsx';
import './assets/styles.scss';

class App extends Component {
    constructor(props) {
      super(props);
      this.speed = 100;
      this.rows = 40;
      this.columns = 60;
    
      this.state = {
          generation: 0,
          entireGrid: Array(this.rows).fill().map(() => Array(this.columns).fill(0))
      }
      this.colorBox = this.colorBox.bind(this); 
      this.random = this.random.bind(this);
      this.go = this.go.bind(this);
      this.aliveNeighbors = this.aliveNeighbors.bind(this);
      this.playButton = this.playButton.bind(this);
      this.pause = this.pause.bind(this);
    };

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
        let mirrorGrid = [...this.state.entireGrid];
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.columns; j++) {
                if (Math.floor(Math.random() * 5) == 1) {
                    mirrorGrid[i][j] = 1;
                }
            }
        }
        this.setState({
            entireGrid: mirrorGrid
        })
    };

    // main logic function
    go() {
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
        };

        this.setState({
        entireGrid: mirrorGrid,
        generation: this.state.generation + 1
        });
    };

    // to count how many neighbors are surrounding the cell
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
    };

    // to make the game actually start- I made this auto (on load)
    playButton() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.go, this.speed);
    };

    // pause the current cycle
    pause() {
        clearInterval(this.intervalId);
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
                go={this.go}
            />
            <h2> Generation: {this.state.generation} </h2>
            <Buttons
                playButton={this.playButton}
                pause={this.pause}
            />
        </div>
      );
    }
  };
  
  export default App;
