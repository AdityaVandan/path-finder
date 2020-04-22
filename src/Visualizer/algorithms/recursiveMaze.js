import { VISITED,OBSTRUCTION,UNVISITED, MAX_COLUMN,MAX_ROW } from './GRAPH_CONSTANTS';
export function recursiveMaze(board,src,dst)
{
    let strKey;
    let currentCell,i,j,hashKey;
    let queue=[];
    let visualQueue=[];
    // for(var x=0;x<MAX_ROW;x++) addToQueue(x,0,board,visualQueue);
    // for(var y=0;y<MAX_COLUMN;y++) addToQueue(MAX_ROW-1,y,board,visualQueue);
    // for(var x=MAX_ROW;x>=0;x--) addToQueue(x,MAX_COLUMN-1,board,visualQueue);
    // for(var y=MAX_COLUMN-1;y>=0;y--) addToQueue(0,y,board,visualQueue);
    for(var p=0;p<MAX_ROW;p++)
    {
        for(var q=0;q<MAX_COLUMN;q++)
        {
            if(p%2===0 && q%2===0)
            {
                strKey=p+'-'+q;
                //if(src.key===strKey || dst.key===strKey) continue;
                //board[strKey].state=OBSTRUCTION
                //board[strKey].className='cssClasses.obstruction';
                addToQueue(p,q,board,visualQueue,src,dst);
            }
        }
    }    
    generateMaze(board,visualQueue,src,dst);
    let previous={};
    let result=[];
    let grid=getGrid(board);
    let r=[1,0]; //x,y x-1,y x+1,y x,y-1 x,y+1
    let c=[0,1];
    result=[board,visualQueue,grid];
    return result;
}
function addToQueue(i,j,board,visualQueue,src,dst)
{
let key=i+'-'+j;
if(key==src.key || key==dst.key) return;
board[key].state=OBSTRUCTION;
visualQueue.push(key);
//board[key].className='cssClasses.obstruction';
}
function generateMaze(board,visualQueue,src,dst)
{
let key,num;
for(var p=0;p<MAX_ROW;p++)
{
    for(var q=0;q<MAX_COLUMN;q++)
    {
        key=board[p+'-'+q];
        if(src.key===key || dst.key===key) continue;
        if(p%2==0 && q%2==0)
        {
            num=(Math.random()*10);
            if(num>=5){
                if(q+1<MAX_COLUMN) addToQueue(p,q+1,board,visualQueue,src,dst);
                num=(Math.random()*10);
                if(num>=5){
                    if(p+1<MAX_ROW) addToQueue(p+1,q,board,visualQueue,src,dst);
                }    
            }
            else
            {
                if(p+1<MAX_ROW) addToQueue(p+1,q,board,visualQueue,src,dst);
            }
        }
    }
}


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