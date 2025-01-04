import React, { useRef, useEffect, useState, useCallback, RefObject } from 'react';
import GridCell from './GridCell';
import { generateGridInstructions } from "@/helpers/generateGridInstructions";

const gridSize = 50;
const cellSize = 10;

function PatternGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<RefObject<HTMLDivElement | null>[]>([]);
  const [canSelect, setCanSelect] = useState(false);
  const [pattern, setPattern] = useState<string[] | null>(null);

  useEffect(() => {
    cellRefs.current = Array(gridSize * gridSize).fill(null).map(() => React.createRef<HTMLDivElement>());
  }, []);

  const handleMouseDown = useCallback(() => setCanSelect(true), []);
  const handleMouseUp = useCallback(() => setCanSelect(false), []);

  const handleMouseMove = useCallback((e: any) => {
    if (!canSelect || !gridRef.current) return;

    const gridRect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - gridRect.left;
    const y = e.clientY - gridRect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const cellIndex = row * gridSize + col;

    if (cellIndex >= 0 && cellIndex < gridSize * gridSize && cellRefs.current[cellIndex]) {
      cellRefs.current[cellIndex].current?.style.setProperty('background-color', 'black')
    }
  }, [canSelect]);

  const generatePattern = useCallback(() => {
    const grid = cellRefs.current.map((cell, index) => {
      return {
        key: index,
        position: index,
        active: cell.current?.style.backgroundColor === 'black'
      }
    })
    setPattern(generateGridInstructions(grid))
  }, [cellRefs])

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          margin: 0,
          padding: 0
        }}
      >
        <div
          style={{
            margin: 0,
            padding: 0,
          }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onDragStart={(e) => e.preventDefault()}
          onMouseMove={handleMouseMove}
          ref={gridRef}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
              gridTemplateRows: `repeat(${gridSize}, 1fr)`,
              border: '1px solid lightgray',
            }}
          >
            {Array.from({ length: gridSize * gridSize }).map((_, index) => (
              <GridCell
                key={index}
                cellSize={cellSize}
                ref={cellRefs.current[index]}
                onClick={() => {
                  const cell = cellRefs.current[index].current;
                  if (cell) {
                    cell.style.backgroundColor = cell.style.backgroundColor === 'black' ? 'white' : 'black';
                  }
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <button onClick={generatePattern}>Generate Pattern</button>
      {pattern && (
        <div>
          {pattern.map((row) => (
            <p key={row}>{row}</p>
          ))}
        </div>
      )}
    </>
  );
}

export default PatternGrid;