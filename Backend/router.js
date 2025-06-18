const express = require('express')
const { PrismaClient, Category } = require('./generated/prisma')
const { ValidationError, NotFoundError } = require('./errors')
const { PrismaClientKnownRequestError } = require('./generated/prisma/runtime/library')

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

const getBoardById = async (id) => {
    const board = await prisma.board.findUnique({where: {id: id}})
    return board
}

const deleteBoard = async (id) => { //prisma client delete can throw its own PrismaClientKnownRequestError which I want to be handled as my custom defined NotFoundError, hence the try catch, so the NotFoundError can be caught by the error handler can be handled in the caller
    try {
        const board = await prisma.board.delete({where:{id: id}})
        return board
    } catch(err){
        return null
    }
}
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

router.get('/boards/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if(!Number.isNaN(id)) {
            const board = await getBoardById(parseInt(id))
            if(board){
                res.status(200).json(board)
            }
            else{
                throw new NotFoundError(`Board with id ${id} does not exist`)
            }
        }
        else if(Number.isNaN(id)){
            throw new ValidationError("Bad Request, board id must be a number")
        }
        else{
            throw new ValidationError("Bad Request, missing required fields (id)")
        }
    } catch (err) {
        next(err)
    }
})

router.delete('/boards/:id', async (req, res, next) => {
    try{
        const id = parseInt(req.params.id)
        if(id && !Number.isNaN(id)) {
            const board = await deleteBoard(id)
            if(board){
                return res.status(204).send()
            }
            else{
                console.log("board: ", board)
                throw new NotFoundError(`Board with id ${id} does not exist`)
            }
        }
        else if (id && Number.isNaN(id)){
            throw new ValidationError("Bad Request, board id must be a number")
        }
        else{
            throw new ValidationError("Bad Request, missing required fields (id)")
        }
    } catch (err){
        console.log("Error name:", err.name)
        console.log(err instanceof PrismaClientKnownRequestError)
        next(err)
    }
})

// router.post('/boards/:boardId/cards', async (req, res, next) => {
//     try{
//         const id = parseInt(req.params.boardId)
//         if(!Number.i)
//     } catch (err){
//         next(err)
//     }
// })


module.exports = router
