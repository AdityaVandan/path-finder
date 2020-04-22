import { VISITED,OBSTRUCTION,UNVISITED,PATH, MAX_COLUMN, MAX_ROW } from './GRAPH_CONSTANTS';
import { getGrid } from './Utility/utility';
export function depthFirstSearch(src,board,dst)
{
    console.log('src',src);
    console.log('dst',dst);
    console.log('board',board);
    let currentCell,i,j,hashKey;
    let stack=[];
    let visualQueue=[];
    let previous={};
    let result=[];
    let r=[-1,0,1,0]; //x,y x-1,y x+1,y x,y-1 x,y+1
    let c=[0,-1,0,1];
    console.log('src:',src);
    console.log('dst:',dst);
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    stack.push(src);

    while(stack.length!=0)
    {
        currentCell=stack.pop();
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
                stack.push(board[hashKey]);
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
            node=previous[node];
            console.log(node);
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
    console.log('path',path);
    console.log('visualQueue',visualQueue);
    return result;


    




}
