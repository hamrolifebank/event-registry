const express = require("express")

const eventsRouter = require("./controllers/events")
const eventPledgers = require("./controllers/eventPledgers")
const middleware = require("./utils/middleware")
const config = require("./utils/config")
const logger = require("./utils/logger")

const app = express()

app.use(express.json())

app.use("/api/events", eventsRouter)
app.use("/api/eventPledgers", eventPledgers)

app.use(middleware.errorHandler)

app.use(middleware.unknownEndpoint)

app.listen(config.PORT, () => {
    logger.info(`Server running on port http://localhost:${config.PORT}`)
})