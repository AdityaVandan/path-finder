import { VISITED,OBSTRUCTION,UNVISITED,PATH, MAX_COLUMN, MAX_ROW } from './GRAPH_CONSTANTS';
//import { PriorityQueue } from './Utility/PriorityQueue';
import { getGrid } from './Utility/utility';
export function dijkstraSearch(src,board,dst,weightsBoard)
{
const pq=new PriorityQueue((a,b)=>{return a[0]<b[0]});
// console.log('src',src);
// console.log('dst',dst);
// console.log('board',board);
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
// console.log('src:',src);
// console.log('dst:',dst);
// console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%')
pq.push([0,src]);


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
        if(!neighbour)
        {
          console.log('error:',currentCell[1].i+r[a],currentCell[1].j+c[a]);
          //continue;
        }
        if(neighbour.state==VISITED || neighbour.state==OBSTRUCTION) continue;
        pathWeight=currentCell[0]+weightsBoard[neighbour.i][neighbour.j]
        pq.push([pathWeight,neighbour]);
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


























const top = 0;
const parent = i => ((i + 1) >>> 1) - 1;
const left = i => (i << 1) + 1;
const right = i => (i + 1) << 1;

export default class PriorityQueue {
  constructor(comparator = (a, b) => a > b) {
    this._heap = [];
    this._comparator = comparator;
  }
  size() {
    return this._heap.length;
  }
  isEmpty() {
    return this.size() == 0;
  }
  peek() {
    return this._heap[top];
  }
  push(...values) {
    values.forEach(value => {
      this._heap.push(value);
      this._siftUp();
    });
    return this.size();
  }
  pop() {
    const poppedValue = this.peek();
    const bottom = this.size() - 1;
    if (bottom > top) {
      this._swap(top, bottom);
    }
    this._heap.pop();
    this._siftDown();
    return poppedValue;
  }
  replace(value) {
    const replacedValue = this.peek();
    this._heap[top] = value;
    this._siftDown();
    return replacedValue;
  }
  _greater(i, j) {
    return this._comparator(this._heap[i], this._heap[j]);
  }
  _swap(i, j) {
    [this._heap[i], this._heap[j]] = [this._heap[j], this._heap[i]];
  }
  _siftUp() {
    let node = this.size() - 1;
    while (node > top && this._greater(node, parent(node))) {
      this._swap(node, parent(node));
      node = parent(node);
    }
  }
  _siftDown() {
    let node = top;
    while (
      (left(node) < this.size() && this._greater(left(node), node)) ||
      (right(node) < this.size() && this._greater(right(node), node))
    ) {
      let maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
      this._swap(node, maxChild);
      node = maxChild;
    }
  }
}