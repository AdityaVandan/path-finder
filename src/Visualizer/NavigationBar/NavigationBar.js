import React, {Component} from 'react';

export default class NavigationBar extends Component{
    state={
        currentAlgorithm:'',
        currentAlgorithmKey:-1,
        currentMaze:'',
        currentMazeKey:-1
    }
    algorithmSelectorHandler(key)
    {
        this.setState({
            currentAlgorithm:this.props.algorithms[key],
            currentAlgorithmKey:key    
        })
        this.props.algorithmHandler(key);
    }
    mazeSelectorHandler(key)
    {
        this.setState({
            ...this.state,
            currentMaze:this.props.mazes[key],
            currentMazeKey:key
        })
        this.props.mazeHandler(key);
    }
    render()
    {
        let background_color='primary-color';
        return (
<nav className={"navbar justify-content-center navbar-expand-lg navbar-dark "+background_color} style={{}}>

  <a className="navbar-brand" href="#"><h1><b><i className="fas fa-route" style={{color:'green'}}></i> Path-Finder</b></h1></a>

</nav>
            );
    }
}