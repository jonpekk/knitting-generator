import { TGridCell } from "@/types/gridCell"
import { ComponentProps } from "react"

type GridCellProps = {
  cellSize: number,
  position: number,
  active: boolean,
  setGridCells: (grid: TGridCell[]) => void,
  gridCells: TGridCell[]
} & ComponentProps<'div'>

function GridCell({
  cellSize,
  position,
  active,
  setGridCells,
  gridCells,
  ...props
}: GridCellProps) {

  return (
    <div
      style={{
        width: cellSize,
        height: cellSize,
        background: active ? 'black' : 'white',
        border: '1px solid lightgray', // Keep the outer border
      }}
      {...props}
    >

    </div>
  )
}

export default GridCell