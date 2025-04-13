import { useRef, useEffect } from "react";

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDraggingRef = useRef(false);
  const filledCells = useRef(new Set());

  const cellSize = 40;
  const rows = 20;
  const cols = 20;

  const getCellKey = (row: number, col: number) => `${row},${col}`;

  const drawGrid = (ctx: any) => {
    ctx.clearRect(0, 0, cols * cellSize, rows * cellSize);

    // Draw filled cells
    filledCells.current.forEach((key: any) => {
      const [row, col] = key.split(",").map(Number);
      ctx.fillStyle = "lightblue";
      ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
    });

    // Draw grid
    ctx.strokeStyle = "#ccc";
    for (let i = 0; i <= cols; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, rows * cellSize);
      ctx.stroke();
    }

    for (let j = 0; j <= rows; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * cellSize);
      ctx.lineTo(cols * cellSize, j * cellSize);
      ctx.stroke();
    }
  };

  const handlePaint = (e: any, ctx: any) => {
    const rect = ctx.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    const key = getCellKey(row, col);

    if (!filledCells.current.has(key)) {
      filledCells.current.add(key);
      drawGrid(ctx);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    drawGrid(ctx);

    const handleMouseDown = (e: any) => {
      isDraggingRef.current = true;
      handlePaint(e, ctx);
    };

    const handleMouseMove = (e: any) => {
      if (isDraggingRef.current) {
        handlePaint(e, ctx);
      }
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        border: "1px solid black",
        display: "block",
        margin: "0 auto",
      }}
    />
  );
}
