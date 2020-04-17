import React, {Component} from 'react';
import Toolbar from './Toolbar/Toolbar'
import Grid from './Grid/Grid';
import Legend from './Legend/Legend';
export default class Visualizer extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            currentAlgorithm:'',
            currentAlgrithmKey:-1,
            algorithms:['Breadth-First-Search','Depth-First-Search','Dijkstra'],
            mazes:['A','B','C']                
        };
    }
    selectAlgorithmHandler=(key)=>{
        this.setState({
            ...this.state,
            currentAlgorithm:this.state.algorithms[key],
            currentAlgorithmKey:key
        });
    }
    selectMazeHandler=(key)=>{
        this.setState({
            ...this.state,
            currentMaze:this.state.mazes[key],
            currentMazeKey:key
        });
    }
    render()
    {
        return (
            <div>
                <Toolbar algorithms={this.state.algorithms} mazes={this.state.mazes} mazeHandler={this.selectMazeHandler} algorithmHandler={this.selectAlgorithmHandler} />
                <Legend />
                <Grid title={this.state.currentAlgorithm} />
            </div>
        );
    }
}