const express = require('express')
const { PrismaClient, Category } = require('./generated/prisma')
const { ValidationError, NotFoundError } = require('./errors')
const router = express.Router()

const prisma = new PrismaClient()

const createBoard = async (info) => {
    const newBoard = await prisma.board.create( {data: {
        ...info,
        category: Category[info.category.toUpperCase()]
    }})
    return newBoard;
}

const getBoards = async () => {
    const boards = await prisma.board.findMany()
    return boards
}
router.get('/boards', async (req, res, next) => {
    try{
        const boards = await getBoards();
        if(boards){
            res.status(200).json(boards).send()
        }
        else{
            throw new NotFoundError("No boards found")
        }
    }
    catch(err){
        next(err)
    }
})

router.post('/boards', async (req, res, next) => {
    try{
        const { title, category, cover_img, author} = req.body
        if( title && Object.values(Category).includes(category) && cover_img && author) {
            console.log("success")
            const newBoard = await createBoard(req.body)
            return res.status(200).json(newBoard)
        }
        else{
            throw new ValidationError("Invalid request, missing required fields (title, category, cover_img, author)")
        }
    } catch(err){
        next(err)
    }

})

module.exports = router
