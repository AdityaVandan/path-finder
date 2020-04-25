import React, {Component} from 'react';
import cssClasses from './Grid.module.css';
import { UNVISITED,MAX_COLUMN,MAX_ROW } from './GRID_CONSTANTS';
import { OBSTRUCTION } from '../algorithms/GRAPH_CONSTANTS';
export function createBoard()
{
    let board=[];
    let cells={};
    let row,x;
    for(let i=0;i<MAX_ROW;i++)
    {
        row=[];
        for(let j=0;j<MAX_COLUMN;j++)
        {
            x={
                i:i,
                j:j,
               state: UNVISITED,
               key: i+'-'+j,
               //className: 'cssClasses.unvisited'
            };
            cells[x.key]=x;
            row.push(x);
        }
        board.push(row);
    }
    return [board,cells];
}

export function createWeightBoard(){
    let weightBoard=[];
    let row,x;
    for(let i=0;i<MAX_ROW;i++)
    {
        row=[];
        for(let j=0;j<MAX_COLUMN;j++)
        {
            x=Math.floor(Math.random()*10)%10;
            row.push(x);
        }
        weightBoard.push(row);
    }
    return weightBoard;

}
export function createEmptyWeightBoard(){
    let weightBoard=[];
    let row,x;
    for(let i=0;i<MAX_ROW;i++)
    {
        row=[];
        for(let j=0;j<MAX_COLUMN;j++)
        {
            x=1;
            row.push(x);
        }
        weightBoard.push(row);
    }
    return weightBoard;

}

















export function createClearedBoard(leaveObstruction,prevBoard){
    let board=[];
    let cells={};
    let row,x;
    for(let i=0;i<MAX_ROW;i++)
    {
        row=[];
        for(let j=0;j<MAX_COLUMN;j++)
        {
            x={
                i:i,
                j:j,
               state: (leaveObstruction && prevBoard[i][j].state===OBSTRUCTION)?OBSTRUCTION:UNVISITED,
               key: i+'-'+j,
               //className: 'cssClasses.unvisited'
            };
            cells[x.key]=x;
            row.push(x);
        }
        board.push(row);
    }
    return [board,cells];
}