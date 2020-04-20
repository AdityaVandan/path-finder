import React, {Component} from 'react';
import cssClasses from './Grid.module.css';
import Toolbar from '../Toolbar/Toolbar';
import Legend from '../Legend/Legend';
import { UNVISITED,VISITED,PATH,VISITING,OBSTRUCTION,MAX_COLUMN,MAX_ROW } from './GRID_CONSTANTS';
import { breadthFirstSearch } from '../algorithms/bfs';
import { recursiveMaze } from '../algorithms/recursiveMaze';
import { createBoard } from './Helper';
export default class Grid extends Component{
    constructor(props){
        super(props);
        this.state={title: 'Dummy Algorithm',
        currentAlgorithm:'',
        currentAlgrithmKey:-1,
        algorithms:['Breadth-First-Search','Depth-First-Search','Dijkstra'],
        mazes:['A','B','C'],
        cellsLoaded:false
    };
    }
    componentDidMount(){
        this.populateDS();
    }
    populateDS=()=>{
        let result=createBoard();
        let board,cells;
        board=result[0];
        cells=result[1];
        this.setState({
            ...this.state,
            grid:board,
            cells:cells,
            src:board[0][0],
            dst:board[5][5]
        },()=>{
            this.setState({
                ...this.state,
                cellsLoaded:true,
                cells:cells
            });
        });
    }
    tdClickHandler=(key)=>{
        if(key===this.state.src.key || key===this.state.dst.key) return;
        let cellState=this.state.cells[key].state;
        this.setState(prevState => {
            let state = Object.assign({}, prevState);  // creating copy of state variable jasper
                state.cells[key].state=cellState!==OBSTRUCTION?OBSTRUCTION:UNVISITED;                   // update the name property, assign a new value                 
                //state.cells[key].className=cssClasses.obstruction;
            return {state};
        });
        if(cellState!==OBSTRUCTION) document.getElementById(key).className=cssClasses.obstruction;
        else document.getElementById(key).className=cssClasses.unvisited;
    }
    componentWillReceiveProps(nextProps) {
        console.log('^^^^^^^^^%^^^^^^^^^^^^^^^^^^^^^^^^^');
        this.setState({title: nextProps.title})
      }

    render()
    {
        return (
            <div>
        <Toolbar algorithms={this.state.algorithms} mazes={this.state.mazes} mazeHandler={this.selectMazeHandler} algorithmHandler={this.selectAlgorithmHandler} />
        <Legend />
        <div className="card card-block">
            <h4 className="card-title"><b>title</b></h4>

            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <div className="flex-row">
            <table align='center'>
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                    {this.state.cellsLoaded?this.state.grid.map((row,index)=>{
                        return (
                            <tr key={index}>
                            {row.map((cell,index)=>{
                                return (
                                <td id={cell.key} key={cell.key} className={cell.state===UNVISITED?cssClasses.unvisited:cell.state===VISITED?cssClasses.visited:cell.state===OBSTRUCTION?cssClasses.obstruction:cell.state==PATH?cssClasses.path:null } onMouseDownCapture={this.tdClickHandler.bind(this,cell.key)}  onDrag={this.tdClickHandler.bind(this,cell.key)}>
                                    {this.state.src.key===cell.key?<i className="fas fa-female"></i>:null}
                                    {this.state.dst.key===cell.key?<i className="fa fa-flag"  aria-hidden="true"></i>:null}</td>
                                )
                            })}

                        </tr>
                        );
                    }):<tr><td>Loading</td></tr>}
                </tbody>
            </table>
            <div>cfsd<button className="btn" onClick={this.bfs}>Breadth First Search</button>
            <button className='btn' onClick={this.clearBoardHandler.bind(this,false)}>clear</button>
            <button className='btn' onClick={this.getRecursieMaze}>recursiveMaze</button>
                </div>
            </div>
        </div>   
        </div>     
        );
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
    clearBoardHandler=(leaveObstruction)=>{
        let key,grid,cells,row,x;
        let board;
        grid=[];
        for(var i=0;i<MAX_ROW;i++)
        {
            row=[];
            for(var j=0;j<MAX_COLUMN;j++)
            {
                document.getElementById(i+'-'+j).className=cssClasses.unvisited;
                if(leaveObstruction)
                {
                    if(this.state.cells[i+'-'+j].state===OBSTRUCTION) 
                    {
                        //console.log(i+'-'+j,'obstruction');
                        this.setState(this.updateCellState(i+'-'+j,OBSTRUCTION,cssClasses.obstruction));
                        document.getElementById(i+'-'+j).className=cssClasses.obstruction;
                    }
                    else 
                    {
                        //console.log(i+'-'+j,'no-obstruction');
                        this.setState(this.updateCellState(i+'-'+j,UNVISITED,cssClasses.unvisited));
                    }
                }
                else this.setState(this.updateCellState(i+'-'+j,UNVISITED,cssClasses.unvisited));

            }
        }
        console.log(this.state);
    }
    updateCellState=(key,cellState,cssClass)=>{
        return (prevState)=>{
            let state = Object.assign({}, prevState);  // creating copy of state variable jasper
            state.cells[key].state=cellState;                   // update the name property, assign a new value                 
            //state.cells[key].className=cssClass;
            return {state};
            }
    }
    getRecursieMaze=()=>
    {
        let currentCell;
        this.clearBoardHandler(false);
        let board=JSON.parse(JSON.stringify(this.state.cells));
        let result=recursiveMaze(board,this.state.src,this.state.dst);
        board=result[0];
        let visualQueue=result[1];
        let grid=result[2];
        var inter=setInterval(()=>{
            if(visualQueue.length===0)
            {
               this.setState({
                    ...this.state,
                    cells:board,
                    src:board[this.state.src.key],
                    dst:board[this.state.dst.key],
                    grid:grid
                },()=>{});
                 
                clearInterval(inter);
            }
            else{
                currentCell=board[visualQueue.shift()];
                //this.setState(updateState,afterUpdate);
                document.getElementById(currentCell.key).className=cssClasses.obstruction;
            }
        },100);

    }
    bfs=()=>{
        this.clearBoardHandler(true);
        let board=JSON.parse(JSON.stringify(this.state.cells));
        let src=board[this.state.src.key];
        let dst=board[this.state.dst.key];
        let currentCell,visualQueue,path,grid;
        let result=breadthFirstSearch(src,board,dst);
        visualQueue=JSON.parse(JSON.stringify(result[0]));
        path=JSON.parse(JSON.stringify(result[1]));
        grid=JSON.parse(JSON.stringify(result[2]));
        //let stateCells=visualQueue.concat(path);
        let afterUpdate=()=>{
            // console.log('src',src);
            // console.log('dst',dst);
            // console.log('board',board);
            // console.log('state',this.state);
            // console.log('grid',grid);
        }
        var inter=setInterval(()=>{
            if(visualQueue.length===0 && path.length===0) 
            {
                // this.setState({
                //     ...this.state,
                //     cells:board,
                //     src:board[src.key],
                //     dst:board[dst.key],
                //     grid:grid
                // },afterUpdate);
                clearInterval(inter);
            }
            else if(visualQueue.length!==0)
            {
                currentCell=board[visualQueue.shift()];
                //this.setState(updateState,afterUpdate);
                document.getElementById(currentCell.key).className=cssClasses.visited;
            }
            else
            {
                currentCell=board[path.pop()];
                //this.setState(updateState,afterUpdate);
                document.getElementById(currentCell.key).className=cssClasses.path;
            }
        },100);
    }

}