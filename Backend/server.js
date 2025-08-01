const express = require('express')
const router = require('./router')
const cors = require('cors')
const { PrismaClientKnownRequestError } = require('./generated/prisma/runtime/library')
const { NotFoundError } = require('./errors')
const app = express()
const PORT = 8080

app.use(express.json())
app.use(cors({
    origin: "https://kudos-boards-1.onrender.com"
}))
app.use('/api', router)

app.use((err, req, res, next) => {
    if (err instanceof PrismaClientKnownRequestError){
        if (err.code === 'P2002'){
            return res.status(400).json({ error: "A unique constraint violation occurred." })
        }
    }
    else {
        return res.status(err.statusCode).json({error: err.message}).send()
    }
})

app.listen(PORT, () => {
    console.log("app started on http://localhost:" + PORT + " !")
})
