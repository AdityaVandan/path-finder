import React, {Component} from 'react';
import cssClasses from './Grid.module.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import Toolbar from '../Toolbar/Toolbar';
import Legend from '../Legend/Legend';
import { UNVISITED,VISITED,PATH,VISITING,OBSTRUCTION,MAX_COLUMN,MAX_ROW,startX,startY,endX,endY } from './GRID_CONSTANTS';
import { breadthFirstSearch } from '../algorithms/bfs';
import { depthFirstSearch } from '../algorithms/dfs';
import { dijkstraSearch } from '../algorithms/dijkstraSearch';
import { recursiveMaze } from '../algorithms/recursiveMaze';
import { dfsMaze } from '../algorithms/dfsMaze';
import { createBoard,createWeightBoard } from './Helper';
export default class Grid extends Component{
    constructor(props){
        super(props);
        this.state={title: 'Dummy Algorithm',
        currentAlgorithm:'',
        disableAll:false,
        currentAlgrithmKey:-1,
        algorithms:['BST','DFS','A*','Dijkstra'],
        mazes:['DFS Maze','B','Random Recursion'],
        cellsLoaded:false,

        weightsSet:false

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
        // let src=board[startX][startY];
        // let dst=board[endX][endY];
        this.setState({
            ...this.state,
            grid:board,
            cells:cells,
            src:board[startY][startX],
            dst:board[endY][endX]
        },()=>{
            this.setState({
                ...this.state,
                cellsLoaded:true,
                cells:cells,
                setters:{start:{x:this.state.src.i,y:this.state.src.j,settter:this.setSrc},end:{x:this.state.dst.i,y:this.state.dst.j,setter:this.setDst}}
            });
        });
    }
    tdClickHandler=(key)=>{
        if(key===this.state.src.key || key===this.state.dst.key || this.state.disableAll==true) return;
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
    setSrc=(i,j)=>{
        let prevKey=this.state.src.key;
        this.setState({
            ...this.state,
            src:this.state.cells[i+'-'+j],
        });
    }
    setDst=(i,j)=>{
        let prevKey=this.state.dst.key;
        this.setState({dst:this.state.cells[i+'-'+j]});
    }
    componentWillReceiveProps(nextProps) {
        console.log('^^^^^^^^^%^^^^^^^^^^^^^^^^^^^^^^^^^');
        this.setState({title: nextProps.title})
      }

    render()
    {
        return (
            <div>
                <NavigationBar />
        <div className="card card-block">

            <h4 className="card-title"><b>title</b></h4>

            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <Toolbar disableAll={this.state.disableAll} setStart={this.setSrc} setEnd={this.setDst} currentAlgorithm={this.state.currentAlgorithm} algorithms={this.state.algorithms} mazes={this.state.mazes} mazeHandler={this.selectMazeHandler} algorithmHandler={this.selectAlgorithmHandler} />
            <Legend />

            <div className="flex-row">
            <table align='center'>
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                    {this.state.cellsLoaded?this.state.grid.map((row,rIndex)=>{
                        return (
                            <tr key={rIndex}>
                            {row.map((cell,cIndex)=>{
                                return (
                                <td id={cell.key} key={cell.key} className={cell.state===UNVISITED?cssClasses.unvisited:cell.state===VISITED?cssClasses.visited:cell.state===OBSTRUCTION?cssClasses.obstruction:cell.state==PATH?cssClasses.path:null } onMouseDownCapture={this.tdClickHandler.bind(this,cell.key)}  onDrag={this.tdClickHandler.bind(this,cell.key)}>
                                    {this.state.src.key===cell.key?<i className="fas fa-female"></i>:this.state.dst.key===cell.key?<i className="fa fa-flag"  aria-hidden="true"></i>:this.state.weightsSet?this.state.weightBoard[rIndex][cIndex]:null}
                                    </td>
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
            <button className='btn' onClick={this.getDFSMaze}>DFSMaze</button>
            <button className='btn' onClick={this.dfs}>DFS</button>
            <button className='btn' onClick={this.createWeights}>Set Weights</button>
            <button className='btn' onClick={this.destroyWeights}>Remove Weights</button>
            <button className='btn' onClick={this.dijstra}>dijkstra</button>
            <br></br>
            <textarea id='testingTextArea'></textarea>
                </div>
            </div>
        </div>   
        </div>     
        );
    }


    selectAlgorithmHandler=(key)=>{
        alert(key);
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
        this.setState({disableAll:true});
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
                    grid:grid,
                    disableAll:false
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
    getDFSMaze=()=>{
        this.setState({disableAll:true});
        let currentCell;
        this.clearBoardHandler(false);
        let board=JSON.parse(JSON.stringify(this.state.cells));
        let result=dfsMaze(board,this.state.src,this.state.dst);
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
                    grid:grid,
                    disableAll:false
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
        this.setState({disableAll:true});
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
        }
        var inter=setInterval(()=>{
            if(visualQueue.length===0 && path.length===0) 
            {
                this.setState({disableAll:false});
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

    dfs=()=>{
        this.setState({disableAll:true});
        this.clearBoardHandler(true);
        let board=JSON.parse(JSON.stringify(this.state.cells));
        let src=board[this.state.src.key];
        let dst=board[this.state.dst.key];
        let currentCell,visualQueue,path,grid;
        let result=depthFirstSearch(src,board,dst);
        visualQueue=JSON.parse(JSON.stringify(result[0]));
        path=JSON.parse(JSON.stringify(result[1]));
        grid=JSON.parse(JSON.stringify(result[2]));
        //let stateCells=visualQueue.concat(path);
        let afterUpdate=()=>{
        }
        var inter=setInterval(()=>{
            if(visualQueue.length===0 && path.length===0) 
            {
                this.setState({disableAll:false});
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
    createWeights=()=>{
        let weightBoard=createWeightBoard();
        this.setState({
            weightsSet:true,
            weightBoard:weightBoard
        });
    }
    destroyWeights=()=>{
        this.setState({
            weightsSet:false,
            weightBoard:null
        });
    }
    dijstra=()=>{
        this.setState({disableAll:true});
        this.clearBoardHandler(true);
        let board=JSON.parse(JSON.stringify(this.state.cells));
        let src=board[this.state.src.key];
        let dst=board[this.state.dst.key];
        let weights=this.state.weightBoard
        let currentCell,visualQueue,path,grid;
        let result=dijkstraSearch(src,board,dst,weights);
        visualQueue=JSON.parse(JSON.stringify(result[0]));
        path=JSON.parse(JSON.stringify(result[1]));
        grid=JSON.parse(JSON.stringify(result[2]));
        //let stateCells=visualQueue.concat(path);
        let afterUpdate=()=>{
        }
        var inter=setInterval(()=>{
            if(visualQueue.length===0 && path.length===0) 
            {
                this.setState({disableAll:false});
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