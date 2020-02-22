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
    }

    colorBox(row, col) {
        let gridCopy = [...this.state.entireGrid];

        // find the square that was clicked, and set it to its opposite
        gridCopy[row][col] = !gridCopy[row][col];

        this.setState({
            entireGrid: gridCopy
        });
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
            />
            <h2> Generation: {this.state.generation} </h2>
        </div>
      );
    }
  }
  
  export default App;