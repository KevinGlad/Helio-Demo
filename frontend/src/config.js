// configure our api enpoints
const uriBase = (process.env.NODE_ENV !== "production" ? (
        "http://localhost:3000"
    ) : (
        ""
    )
)

const apiVer = "api/v1"

export {uriBase, apiVer}
