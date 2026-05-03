import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf;

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onOver = (e) => {
      const t = e.target;
      if (t.closest("button, a, input, textarea, select, [data-cursor='hover']")) {
        ring.style.width = "60px";
        ring.style.height = "60px";
        ring.style.borderColor = "rgba(236, 72, 153, 0.8)";
      } else {
        ring.style.width = "36px";
        ring.style.height = "36px";
        ring.style.borderColor = "rgba(168, 85, 247, 0.6)";
      }
    };

    const tick = () => {
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Hide on touch
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
