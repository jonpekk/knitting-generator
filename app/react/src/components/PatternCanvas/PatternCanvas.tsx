import { useRef, useEffect } from "react";

function PatternCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return

    const ctx = canvas.getContext("2d");
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw something simple (a red rectangle)
    ctx.fillStyle = "white";
    ctx.fillRect(100, 100, 200, 100);

    // Optional: Resize listener
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.fillStyle = "white";
      ctx.fillRect(100, 100, 200, 100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

export default PatternCanvas