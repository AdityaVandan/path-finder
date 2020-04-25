import { VISITED,OBSTRUCTION,UNVISITED, MAX_COLUMN,MAX_ROW, MAZE } from './GRAPH_CONSTANTS';
export function recursiveDivisonMaze(board,src,dst)
{
let grid=getGrid(board);
let visited=generateVisited();
let visualQueue;
//visited[src.i][src.j]=true;
//visited[dst.i][dst.j]=true;

visualQueue=dfs(board,MAZE.x,MAZE.y,visited,src,dst);
let result=[board,visualQueue,grid];
return result;
}
function dfs(board,i,j,visited,src,dst)
{
    let visualQueue=[];
    for(var x=0;x<MAX_ROW;x++) addToQueue(x,0,board,visualQueue,src,dst);
    for(var y=0;y<MAX_COLUMN;y++) addToQueue(MAX_ROW-1,y,board,visualQueue,src,dst);
    for(var x=MAX_ROW-1;x>=0;x--) addToQueue(x,MAX_COLUMN-1,board,visualQueue,src,dst);
    for(var y=MAX_COLUMN-1;y>=0;y--) addToQueue(0,y,board,visualQueue,src,dst);    
    let minI,minJ,maxI,maxJ,mid,mid1,mid2,opening;
    minJ=minI=2;
    maxI=MAX_ROW-2-1;
    maxJ=MAX_COLUMN-2-1;
    let stack=[];
    stack.push([minI,minJ,maxI,maxJ,true]);
    //addToQueue(i,j,board,visualQueue,src,dst)
    visited[i][j]=true;
    let currentNode,counter;
    counter=0;
    while(stack.length!=0)
    {
        //if(counter==10) break; 
        //counter++;
        if(stack.length==100) break;
        currentNode=stack.pop();
        minI=currentNode[0];
        minJ=currentNode[1];
        maxI=currentNode[2];
        maxJ=currentNode[3];
        console.log('currentNode:',currentNode);
        if(currentNode[4]){
            if(maxI-minI<2) continue;
            mid=Math.floor(randomNumber(minJ, maxJ)/2)*2;
            createVertical(minI,maxI,mid,board,visualQueue,src,dst);
            stack.push([minI,minJ,maxI,mid-1,!currentNode[4]]);
            stack.push([minI,mid+1,maxI,maxJ,!currentNode[4]]);
        }
        else{
            if(maxJ-minJ<2) continue;
            mid=Math.floor(randomNumber(minI,maxI)/2)*2;
            createHorizontal(minJ,maxJ,mid,board,visualQueue,src,dst);
            stack.push([minI,minJ,mid-1,maxJ,!currentNode[4]]);
            stack.push([mid+1,minJ,maxI,maxJ,!currentNode[4]]);
        }
    
    }
    return visualQueue;
}
function createHorizontal(minJ,maxJ,mid,board,visualQueue,src,dst)
{
    let hole=Math.floor(randomNumber(minJ,maxJ)/2)*2+1;
    for(var x=minJ;x<=maxJ;x++){
        if(x==hole) continue;
        else addToQueue(mid,x,board,visualQueue,src,dst);
    }
}
function createVertical(minI,maxI,mid,board,visualQueue,src,dst){
    let hole=Math.floor(randomNumber(minI,maxI)/2)*2+1;
    for(var x=minI;x<=maxI;x++){
        if(x==hole) continue;
        else addToQueue(x,mid,board,visualQueue,src,dst);
    }
}


function addToQueue(i,j,board,visualQueue,src,dst)
{
if((i==src.i && j==src.j) || (i==dst.i && j==dst.j)) return;
let key=i+'-'+j;
//console.log(key);
if(!board[key]){
    console.log('2222222222222222      '+key);
    return;
}
board[key].state=OBSTRUCTION;
visualQueue.push(key);
//board[key].className='cssClasses.obstruction';
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
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
function generateVisited(){
    let visited,row;
    visited=[];
    for(var i=0;i<MAX_ROW;i++)
    {
        row=[]
        for(var j=0;j<MAX_COLUMN;j++)
        {
            row.push(false);
        }
        visited.push(row);
    }
    return visited;    
}
