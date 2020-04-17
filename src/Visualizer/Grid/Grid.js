import React, {Component} from 'react';
import cssClasses from './Grid.module.css';
import { UNVISITED,VISITED,VISITING,OBSTRUCTION } from './GRID_CONSTANTS';
export default class Grid extends Component{
    constructor(props){
        super(props);
        console.log("Grid Component Got created");
        this.state={title: 'Dummy Algorithm',
        cellsLoaded:false
    };
    }
    componentDidMount(){
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        this.populateDS();
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');    
    }
    populateDS=()=>{
        let board=[];
        let cells={};
        let row,x;
        for(let i=0;i<20;i++)
        {
            row=[];
            for(let j=0;j<50;j++)
            {
                x={
                   state: UNVISITED,
                   key: i+'-'+j,
                   className: 'cssClasses.unvisited'
                };
                cells[x.key]=x;
                row.push(x);
            }
            board.push(row);
        }
        this.setState({
            ...this.state,
            grid:board,
            cells:cells,
            src:board[3][5],
            dst:board[9][19]
        },()=>{
            this.setState({
                ...this.state,
                cellsLoaded:true,
                cells:cells
            });
            console.log(this.state);
        });
    }
    tdClickHandler=(key)=>{
        console.log(key);        
        this.setState(prevState => {
            //console.log("grid");
            let state = Object.assign({}, prevState);  // creating copy of state variable jasper
            console.log(state.cells[key].state,'sdc',OBSTRUCTION);
            // if(state.cells[key].state==OBSTRUCTION)
            // {
            //     state.cells[key].state=UNVISITED;                   // update the name property, assign a new value                 
            //     state.cells[key].className=cssClasses.unvisited;
            // }
            // else
            // {
                state.cells[key].state=OBSTRUCTION;                   // update the name property, assign a new value                 
                state.cells[key].className=cssClasses.obstruction;
            // }
            return {state};
        });
    }
    tdClickedHandler=(key)=>{}
    componentWillReceiveProps(nextProps) {
        console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
        this.setState({title: nextProps.title})
      }

    render()
    {
        const {title}=this.props;
        return (
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
                                <td key={cell.key} className={cell.className} onMouseDownCapture={this.tdClickHandler.bind(this,cell.key)}  onDrag={this.tdClickHandler.bind(this,cell.key)}>
                                    {this.state.src.key==cell.key?<i class="fas fa-male"></i>:null}
                                    {this.state.dst.key==cell.key?<i class="fa fa-flag"  aria-hidden="true"></i>:null}</td>
                                )
                            })}

                        </tr>
                        );
                    }):<tr><td>Loading</td></tr>}
                </tbody>
            </table>
            <div>cfsd
                </div>
            </div>
        </div>        
        );
    }
}