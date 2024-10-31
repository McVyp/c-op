import { useEffect } from "react";

export function Tracker() {
  useEffect(() => {
    function handleMove(event: MouseEvent | TouchEvent) {
      const source = "touches" in event ? event.touches[0] : event;
      console.log(`X:${source.clientX}, Y:${source.clientY}`);
    }
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("touchmove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, []);

  return null;
}
