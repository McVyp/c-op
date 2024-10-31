import { useEffect } from "react";

export function Tracker() {
  useEffect(() => {
    function handleMove(event: MouseEvent) {
      console.log(`X:${event.clientX}, Y:${event.clientY}`);
    }
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return null;
}
