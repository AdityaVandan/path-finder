import { VISITED,OBSTRUCTION,UNVISITED,PATH, MAX_COLUMN, MAX_ROW } from './GRAPH_CONSTANTS';
import PriorityQueue from './Utility/PriorityQueue';
export function bestFirstSearch(src,board,dst,heuristics)
{
    // console.log('src',src);
    // console.log('dst',dst);
    // console.log('board',board);
    let z,currentCell,i,j,hashKey;
    let queue=new PriorityQueue((a,b)=>{return a[0]<b[0];});
    let visualQueue=[];
    let previous={};
    let result=[];
    let r=[-1,0,1,0]; //x,y x-1,y x+1,y x,y-1 x,y+1
    let c=[0,-1,0,1];
    // console.log('src:',src);
    // console.log('dst:',dst);
    // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    queue.push([heuristics[src.i][src.j],src]);
    while(!queue.isEmpty())
    {
        z=queue.pop();
        // if(!z)
        // {
        //     console.log(queue.length())
        //     continue;
        // }
        console.log(z);
        currentCell=z[1];
        if(currentCell.state===VISITED) continue;
        if(currentCell.key===dst.key)
        {
            visualQueue.push(currentCell.key);
            currentCell.state=VISITED;
            break;
        }
        currentCell.state=VISITED;
        //currentCell.className=cssClasses.visited;
        visualQueue.push(currentCell.key);
        for(let a=0;a<r.length;a++) //or c.length
        {
            i=currentCell.i+r[a];
            j=currentCell.j+c[a];
            hashKey=i+'-'+j;
            if(board[hashKey] && board[hashKey].state===UNVISITED)
            {
                // console.log('null path error:','previous:'+i+'-'+j,'current:'+hashKey,'cell:'+board[hashKey],'weight'+heuristics[i][j]);
                queue.push([heuristics[i][j],board[hashKey]]);
                previous[hashKey]=currentCell.i+'-'+currentCell.j;
            }
        }
    }
    let node=dst.key;
    let path=[];
    while(1)
    {
        if(node)
        {
            path.push(node);
            board[node].state=PATH;
            if(!previous[node]) break;
            node=previous[node];
            // console.log(node);
            if(node===src.key)
            {
                path.push(node);
                board[node].state=PATH;
                break;
            }
        }
        else break;
    }
    let grid=getGrid(board);
    result=[visualQueue,path,grid];
    // console.log('path',path);
    // console.log('visualQueue',visualQueue);
    return result;
}
function getGrid(board)
{
    let grid,row;
    grid=[];
    for(var i=0;i<MAX_ROW;i++)
    {
        row=[]
        for(var j=0;j<MAX_COLUMN;j++)
        {
            row.push(board[i+'-'+j]);
        }
        grid.push(row);
    }
    return grid;
}