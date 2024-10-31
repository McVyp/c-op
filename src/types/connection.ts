import {ServerConnection} from "../utils/index"
import React from "react"

export interface ClientConnection extends ServerConnection {
    ref: React.RefObject<HTMLDivElement>
}