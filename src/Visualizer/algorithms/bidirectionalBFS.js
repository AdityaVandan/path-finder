import { VISITED,OBSTRUCTION,UNVISITED,PATH, MAX_COLUMN, MAX_ROW,SRC_VISITED,DST_VISITED } from './GRAPH_CONSTANTS';
export function breadthFirstSearch(src,board,dst)
{
    console.log('src',src);
    console.log('dst',dst);
    console.log('board',board);
    let currentCell,i,j,hashKey,turn;
    let queueSrc=[];
    let queueDst=[];
    let visualQueue=[];
    let previous={};
    let visited=[];
    let result=[];
    let r=[-1,0,1,0]; //x,y x-1,y x+1,y x,y-1 x,y+1
    let c=[0,-1,0,1];
    console.log('src:',src);
    console.log('dst:',dst);
    console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
    queueSrc.push(src);
    queueDst.push(dst);
    turn=true;
    while(queueSrc.length!=0 && queueDst.length!=0)
    {
        if(turn){
            currentCell=queueSrc.shift();
            if(currentCell.state===SRC_VISITED) continue;
            if(currentCell.key===DST_VISITED)
            {
                visualQueue.push(currentCell.key);
                currentCell.state=VISITED;
                break;
            }
            currentCell.state=SRC_VISITED;
            

        }
        else{

        }
        turn=!turn;
    }

}