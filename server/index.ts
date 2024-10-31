import { parse, type ServerMessage, stringify, type ClientMessage, type ServerConnection } from '../src/utils/index'
const GROUP_ID = "c-op"
const connections = new Map<string, ServerConnection>()

function parseMessage(raw: string | Buffer) {
    return parse<ClientMessage>(
        typeof raw === "string" ? raw : new TextDecoder().decode(raw)
    )
}

const server = Bun.serve<{ connectionId: string }>({
    port: 8081,
    fetch(req, server) {
        const url = new URL(req.url)

        if (url.pathname === "/chat") {
            const name = url.searchParams.get("name")
            const connectionId = Math.random().toString(36).slice(2)

            //save the connection for later users
            connections.set(connectionId, {
                id: connectionId,
                coords: { x: 0, y: 0 },
                user: {
                    id: connectionId,
                    name: name || "Annoymous"
                }
            })

            const success = server.upgrade(req, { data: { connectionId } })
            return success ? undefined : new Response("WebSocket upgrade error", { status: 400 })
        }
        return new Response("Hello World")
    },
    websocket: {
        open(ws) {
            const connection = connections.get(ws.data.connectionId)
            if (!connection) return

            ws.subscribe(GROUP_ID)

            ws.publish(GROUP_ID, stringify({ type: "connect", connection }))
        },
        message(ws, raw) {
            const message = parseMessage(raw)
            switch (message.type) {
                case "info":
                    ws.send(
                        stringify<ServerMessage>({
                            type: "info",
                            connections: [...connections.values()].filter(
                                (connection) => connection.id !== ws.data.connectionId,
                            )
                        })
                    )
                    break
                case "move": {
                    //ignore unkown users
                    const connection = connections.get(ws.data.connectionId)
                    if (!connection) return
                    connections.set(ws.data.connectionId, {
                        ...connection,
                        coords: message.coords,
                    })

                    ws.publish(
                        GROUP_ID,
                        stringify<ServerMessage>({
                            type: "move",
                            connectionId: ws.data.connectionId,
                            coords: message.coords
                        }),
                    )
                }
                    break
            }
        },
        close(ws) {
            connections.delete(ws.data.connectionId)
            ws.unsubscribe(GROUP_ID)

            server.publish(
                GROUP_ID,
                stringify<ServerMessage>({
                    type: "disconnect",
                    connectionId: ws.data.connectionId
                })
            )
        }
    }
})