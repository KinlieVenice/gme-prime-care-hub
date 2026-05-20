// src/server.tsx
import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";
import { getRouter } from "./router";

// ❌ current — calls handler immediately at import time
// export default createStartHandler(getRouter)(defaultStreamHandler);

// ✅ fix — export the handler function, let Nitro call it per-request
export default createStartHandler(getRouter, defaultStreamHandler);
