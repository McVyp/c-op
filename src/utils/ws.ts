import { ServerConnection } from "./connection"

export interface Coords {
    x: number
    y: number
}

export type ServerMessage = | { connections: ServerConnection[]; type: "info" } | { connection: ServerConnection; type: "connect" } | { connectionId: string; type: "disconnect" } | { connectionId: string; coords: Coords; type: "move" }

export type ClientMessage = { coords: Coords; type: "move" } | { type: "info" }

export function stringify<T extends ServerMessage | ClientMessage = ClientMessage>(data: T) {
    return JSON.stringify(data)
}

export function parse<T extends ServerMessage | ClientMessage = ServerMessage>(
    data: string,
): T {
    return JSON.parse(data)
}