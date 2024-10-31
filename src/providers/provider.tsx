import React from "react";
import { UserProvider } from "./userprovider";

export function Provider({ children }: { children: React.ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
