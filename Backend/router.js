const express = require('express')
const { PrismaClient, Category } = require('./generated/prisma')
const { ValidationError } = require('./errors')
const router = express.Router()

const prisma = new PrismaClient()

const createCard = async (info) => {
    const newCard = await prisma.card.create( {data: {
        ...info,
        category: Category[info.category.toUpperCase()],
        cards: []
    }})
    return newCard;
}
router.get('/', (req, res) => {
    res.send('Hello World')
})

router.post('/card', (req, res, next) => {
    const { title, category, cover_img, author } = req.body
    if( title && Object.values(Category).includes(category) && cover_img && author ) {
        createCard({ title, category, cover_img, author })
        return res.status(200).send("Success")
    }
    else{
        const error = new ValidationError("Invalid request")
        next(error)
    }

})

module.exports = router
