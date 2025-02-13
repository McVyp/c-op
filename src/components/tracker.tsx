import { useEffect } from "react";
import { useSocket } from "../hooks";
import { stringify } from "../utils";

export function Tracker({ isActive }: { isActive: boolean }) {
  const { send } = useSocket();

  useEffect(() => {
    function handleMove(event: MouseEvent | TouchEvent) {
      const source = "touches" in event ? event.touches[0] : event;
      if (!source) return;

      send(
        stringify({
          type: "move",
          coords: {
            x: (source.clientX / window.innerWidth) * 100,
            y: (source.clientY / window.innerHeight) * 100,
          },
        })
      );
    }

    if (isActive) {
      window.addEventListener("mousemove", handleMove);
      window.addEventListener("touchmove", handleMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
    };
  }, [isActive, send]);

  return null;
}
