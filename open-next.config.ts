import type { OpenNextConfig } from "open-next/types/open-next.js"

const config = {
    default: {
        override: {
            wrapper: () => import("./lib/otel/wrapper").then((mod) => mod.default),
        },
    },
} as OpenNextConfig

export default config
