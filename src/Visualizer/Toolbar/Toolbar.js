import React, {Component} from 'react';

export default class Toolbar extends Component{
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
<nav className={"navbar navbar-expand-lg navbar-dark "+background_color} style={{}}>

  <a className="navbar-brand" href="#"><h2><b>Path-Finder</b></h2></a>

  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
    aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="basicExampleNav">

    <ul className={"navbar-nav mr-auto"}>
    <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">Algorithms</a>
        <div className={"dropdown-menu dropdown-primary"+background_color} aria-labelledby="navbarDropdownMenuLink">
        {this.props.algorithms.map((algorithm,index)=>{return <a className="dropdown-item" key={index} onClick={this.algorithmSelectorHandler.bind(this,index)}>{algorithm}</a>})}
        </div>
      </li>
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
          aria-haspopup="true" aria-expanded="false">Mazes</a>
        <div className="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
        {this.props.mazes.map((maze,index)=>{return <a className="dropdown-item" key={index} onClick={this.mazeSelectorHandler.bind(this,index)}>{maze}</a>})}
        </div>
      </li>

      <li className="nav-item">
        <button className="btn btn-sm btn-light-blue" ><b>Visualize</b> {this.state.currentAlgorithm}</button>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">clear board</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">clear path</a>
      </li>


    </ul>


</div>
</nav>
            );
    }
}