import { VISITED,OBSTRUCTION,UNVISITED,PATH, MAX_COLUMN, MAX_ROW } from './GRAPH_CONSTANTS';
import PriorityQueue from './Utility/PriorityQueue';
import { getGrid } from './Utility/utility';
export function bestFirstSearchWeighted(src,board,dst,weightsBoard,heuristic)
{
const pq=new PriorityQueue((a,b)=>{return a[0]<b[0]});
console.log('src',src);
console.log('dst',dst);
console.log('board',board);
let currentCell,i,j,hashKey,pathWeight,weight;
let visualQueue=[];
let previous={};
let next={};
let result=[];
let weights={};
let visited={};

let grid=getGrid(board);

let neighbour;
let r=[-1,0,1,0]; //x,y x-1,y x+1,y x,y-1 x,y+1
let c=[0,-1,0,1];
console.log('src:',src);
console.log('dst:',dst);
console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
pq.push([weightsBoard[src.i][src.j]+heuristic[src.i][src.j],src,heuristic[src.i][src.j]]);


while(!pq.isEmpty())
{
    currentCell=pq.pop();
    //visited[currentCell.i+'-'+currentCell.j]
    if(currentCell[1].state==VISITED) continue;
    currentCell[1].state=VISITED;
    visualQueue.push(currentCell[1].key);
    //weights[currentCell.i+'-'+currentCell.j]=currentCell;
    if(currentCell[1].key==dst.key) break;
    for(let a=0;a<r.length;a++){ // or c.length
        i=currentCell[1].i+r[a];
        j=currentCell[1].j+c[a];
        //console.log('grid error',currentCell[1].i+r[a]);
        if(i<0 || i>=MAX_ROW || j<0 || j>=MAX_COLUMN) continue;
        neighbour=grid[currentCell[1].i+r[a]][currentCell[1].j+c[a]];
        if(neighbour.state==VISITED || neighbour.state==OBSTRUCTION) continue;
        pathWeight=currentCell[2]+weightsBoard[neighbour.i][neighbour.j]
        pq.push([pathWeight+heuristic[neighbour.i][neighbour.j],neighbour,pathWeight]);
        weight=previous[neighbour.key]?previous[neighbour.key][0]:Infinity;
        if(weight>pathWeight) previous[neighbour.key]=[pathWeight,currentCell[1].key];
    }

}

console.log(previous);

let node=dst.key;
let path=[];
while(1)
{
    if(node)
    {
        path.push(node);
        board[node].state=PATH;
        if(!previous[node]) break;
        node=previous[node][1];
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



result=[visualQueue,path,grid];
console.log('path',path);
console.log('visualQueue',visualQueue);
return result;
}