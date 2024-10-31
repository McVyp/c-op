import clsx from "clsx";
import ColorHash from "color-hash";
import React, { forwardRef } from "react";
import { ClientConnection } from "../types";
import { Arrow } from "./arrow";

interface CursorProps {
  connection: ClientConnection;
}

export const Cursor = forwardRef<HTMLDivElement, CursorProps>(function Curosor(
  { connection },
  ref
) {
  if (!connection) {
    return null;
  }

  const hash = new ColorHash({ lightness: 0.3 });
  const color = hash.hex(connection.user.name);
  return (
    <div
      ref={ref}
      className={clsx(
        "fixed flex translate-x-[--x] translate-y-[--y] gap-1 rounded text-xs",
        connection.coords.x ? "visible" : "invisible"
      )}
      style={
        {
          "--x": `${connection.coords.x}vw`,
          "--y": `${connection.coords.y}vh`,
        } as React.CSSProperties
      }
    >
      <Arrow color={color} />
      <span className="relative " style={{ backgroundColor: color }}>
        {connection.user.name}
      </span>
    </div>
  );
});
