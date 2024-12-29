import { generateGridInstructions } from "@/helpers/generateGridInstructions";
import { useEffect, useState } from "react";
import GridCell from "./GridCell";
import { TGridCell } from "@/types/gridCell";

const gridSize = 50; // Number of rows and columns
const cellSize = 20; // Size of each cell in pixels

function PatternGrid() {
  const [pattern, setPattern] = useState<string[] | null>(null)
  const [gridCells, setGridCells] = useState<TGridCell[]>([])
  const [canSelect, setCanSelect] = useState(false)

  useEffect(() => {
    const cells = [];
    for (let i = 0; i < (gridSize * gridSize); i++) {
      cells.push({
        key: i,
        position: i,
        active: false
      })
    }

    setGridCells(cells)

  }, [])
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        onMouseDown={() => setCanSelect(true)}
        onMouseUp={() => setCanSelect(false)}
        onDragStart={(e) => {
          e.preventDefault()
        }}
      >
        <div
          style={{
            display: 'inline-grid',
            gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize}, 1fr)`,
            border: '1px solid lightgray',
          }}
        >
          {gridCells.map(cell => (
            <GridCell
              key={cell.key}
              cellSize={cellSize}
              position={cell.position}
              active={cell.active}
              gridCells={gridCells}
              setGridCells={setGridCells}
              onClick={() => {
                const newGrid = [...gridCells]
                newGrid[cell.position].active = !newGrid[cell.position].active

                setGridCells(newGrid)
              }}
              onMouseMoveCapture={() => {
                if (canSelect) {
                  const newGrid = [...gridCells]
                  newGrid[cell.position].active = true // !newGrid[cell.position].active

                  setGridCells(newGrid)
                }
              }}
            />
          ))

          }
        </div>
      </div>
      <button
        onClick={() => setPattern(generateGridInstructions(gridCells))}
      >
        Generate Pattern
      </button>
      {pattern && (
        <div>
          {pattern.map((row) => (
            <p key={row}>
              {row}
            </p>
          ))}
        </div>
      )}
    </>
  );
}

export default PatternGrid