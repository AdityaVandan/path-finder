import React, {Component} from 'react';
import Toolbar from './Toolbar/Toolbar'
import Grid from './Grid/Grid';
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
    render()
    {
        return (
            <div>
                <Grid />
            </div>
        );
    }
}