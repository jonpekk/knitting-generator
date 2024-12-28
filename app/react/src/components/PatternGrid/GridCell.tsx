import { useState } from "react"

function GridCell({
  cellSize,
  position,
  active,
  setGridCells,
  gridCells
}: any) {

  return (
    <div
      style={{
        width: cellSize,
        height: cellSize,
        background: active ? 'red' : 'white',
        border: '1px solid lightgray', // Keep the outer border
      }}
      onClick={() => {
        const newGrid = [...gridCells]
        newGrid[position].active = !newGrid[position].active

        setGridCells(newGrid)
      }}
    >

    </div>
  )
}

export default GridCell