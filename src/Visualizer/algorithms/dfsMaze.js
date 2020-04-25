import { VISITED,OBSTRUCTION,UNVISITED, MAX_COLUMN,MAX_ROW, MAZE } from './GRAPH_CONSTANTS';
export function dfsMaze(board,src,dst)
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
    let stack=[];
    stack.push([i,j]);
    addToQueue(i,j,board,visualQueue,src,dst)
    visited[i][j]=true;
    let currentNode,steps,r,c,index,z,a,b;
    while(stack.length!=0)
    {
        currentNode=stack.pop();
        console.log('currentNode:',currentNode[0],currentNode[1]);
        steps=[];
        r=[-1,0,1,0];
        c=[0,-1,0,1];
        for(let x=0;x<r.length;x++) steps.push([r[x],c[x]]);
        visit(board,currentNode[0],currentNode[1],steps,visualQueue,visited,src,dst);
        index=0;
        z=4;
        console.log('traversing');
        while(r.length>0)
        {
            index=(Math.floor(Math.random()*10))%z;
            a=currentNode[0]+r[index]*2;
            b=currentNode[1]+c[index]*2;
            r.splice(index,1);
            c.splice(index,1);
            z--;
            if(isValid(a,b,MAX_ROW,MAX_COLUMN) && visited[a][b]===false)
            {
                visited[a][b]=true;
                stack.push([a,b]);
            }
        }
    
    }
    return visualQueue;
}
function visit(board,i,j,steps,visualQueue,visited,src,dst){
    let vi,vj,indexI,indexJ;
    for(var q=0;q<steps.length;q++)
    {
		indexI = i+steps[q][0];
		indexJ = j+steps[q][1];
		vi = i+steps[q][0]*2;
		vj = j+steps[q][1]*2;
		if(!isValid(indexI,indexJ,MAX_ROW,MAX_COLUMN)) continue;
        if(isValid(vi,vj,MAX_ROW,MAX_COLUMN) && visited[vi][vj]===false)
        {
            addToQueue(indexI,indexJ,board,visualQueue,src,dst);
            visited[indexI][indexJ]=true;
            addToQueue(vi,vj,board,visualQueue,src,dst);
        } 
    }
}

function isValid(i,j,maxR,maxC){
	return (i>=0 && i<maxR && j>=0 && j<maxC);
}
function addToQueue(i,j,board,visualQueue,src,dst)
{
if((i==src.i && j==src.j) || (i==dst.i && j==dst.j)) return;
let key=i+'-'+j;
board[key].state=OBSTRUCTION;
visualQueue.push(key);
//board[key].className='cssClasses.obstruction';
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
function test(visited){
    var x='';
    for(var p=0;p<visited.length;p++)
    {
        for(var q=0;q<visited[p].length;q++) x+=visited[p][q]+' ';
        x+='\n';
    }
    document.getElementById('testingTextArea').value=document.getElementById('testingTextArea').value+'\n\n\n'+x;
}