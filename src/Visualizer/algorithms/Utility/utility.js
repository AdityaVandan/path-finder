import { VISITED,OBSTRUCTION,UNVISITED,PATH, MAX_COLUMN, MAX_ROW } from '../GRAPH_CONSTANTS';
export function getGrid(board)
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
//export default getGrid;