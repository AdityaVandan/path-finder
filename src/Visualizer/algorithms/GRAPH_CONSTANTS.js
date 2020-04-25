const UNVISITED=0;
const VISITED=1;
const OBSTRUCTION=2
const VISITING=3;
const PATH=4
const SRC_VISITED=5;
const DST_VISITED=6;
// const MAX_ROW=20;
// const MAX_COLUMN=50;
const MAX_ROW=21;
const MAX_COLUMN=55;
const startX=10;
const startY=10;
const endX=40;
const endY=10;
const MAZE={
    x:10,
    y:26
};
const MAZE_SPEED=50;
const SEARCH_SPEED=100;
export { UNVISITED, VISITED, VISITING,OBSTRUCTION,MAX_COLUMN,MAX_ROW,PATH,startX,startY,endX,endY,MAZE,SEARCH_SPEED,MAZE_SPEED,SRC_VISITED,DST_VISITED}