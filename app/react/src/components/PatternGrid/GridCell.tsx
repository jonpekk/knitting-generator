import { TGridCell } from "@/types/gridCell"

type GridCellProps = {
  cellSize: number,
  position: number,
  active: boolean,
  setGridCells: (grid: TGridCell[]) => void,
  gridCells: TGridCell[]
}

function GridCell({
  cellSize,
  position,
  active,
  setGridCells,
  gridCells
}: GridCellProps) {

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