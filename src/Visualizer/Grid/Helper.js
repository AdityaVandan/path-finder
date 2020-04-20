import React, {Component} from 'react';
import cssClasses from './Grid.module.css';
import { UNVISITED,MAX_COLUMN,MAX_ROW } from './GRID_CONSTANTS';
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