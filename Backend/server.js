//route planning
const express = require('express')
const router = require('./router')
const app = express()
const PORT = 8080


app.use(express.json())

app.use('/api', router)

app.listen(PORT, () => {
    console.log("app started on http://localhost:" + PORT + " !")
})
