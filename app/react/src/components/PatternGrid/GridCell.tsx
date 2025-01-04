
import { ComponentProps, forwardRef } from "react"

type GridCellProps = {
  cellSize: number
} & ComponentProps<'div'>

const GridCell = forwardRef<HTMLDivElement, GridCellProps>(({
  cellSize,
  ...props
}, ref) => {

  return (
    <div
      style={{
        width: cellSize,
        height: cellSize,
        background: 'white',
        border: '1px solid lightgray', // Keep the outer border
      }}
      ref={ref}
      {...props}
    >

    </div>
  )
})

export default GridCell