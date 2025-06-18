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

const getBoardById = async (boardId) => {
    const board = await prisma.board.findUnique({where: {id: boardId}})
    return board
}

const deleteBoard = async (boardId) => { //prisma client delete can throw its own PrismaClientKnownRequestError which I want to be handled as my custom defined NotFoundError, hence the try catch, so the NotFoundError can be caught by the error handler can be handled in the caller
    try {
        const board = await prisma.board.delete({where:{id: boardId}})
        return board
    } catch(err){
        return null
    }
}
router.post('/boards', async (req, res, next) => {
    try{
        const { title, category, coverImg, author} = req.body
        if( title && Object.values(Category).includes(category) && coverImg && author) {
            const newBoard = await createBoard(req.body)
            return res.status(200).json(newBoard)
        }
        else{
            throw new ValidationError("Invalid request, missing required fields (title, category, coverImg, author)")
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

router.get('/boards/:boardId', async (req, res, next) => {
    try {
        const boardId = parseInt(req.params.boardId)
        if(!Number.isNaN(boardId)) {
            const board = await getBoardById(parseInt(boardId))
            if(board){
                res.status(200).json(board)
            }
            else{
                throw new NotFoundError(`Board with id ${boardId} does not exist`)
            }
        }
        else if(Number.isNaN(boardId)){
            throw new ValidationError("Bad Request, boardId must be a number")
        }
        else{
            throw new ValidationError("Bad Request, missing required fields (boardId)")
        }
    } catch (err) {
        next(err)
    }
})

router.delete('/boards/:boardId', async (req, res, next) => {
    try{
        const boardId = parseInt(req.params.boardId)
        if(boardId && !Number.isNaN(boardId)) {
            const board = await deleteBoard(boardId)
            if(board){
                return res.status(204).send()
            }
            else{
                throw new NotFoundError(`Board with id ${boardId} does not exist`)
            }
        }
        else if (boardId && Number.isNaN(boardId)){
            throw new ValidationError("Bad Request, boardId must be a number")
        }
        else{
            throw new ValidationError("Bad Request, missing required fields (id)")
        }
    } catch (err){
        next(err)
    }
})

//card routes

const createCard = async (boardId, info) =>  { //prisma client delete can throw its own PrismaClientKnownRequestError which I want to be handled as my custom defined NotFoundError, hence the try catch, so the NotFoundError can be caught by the error handler can be handled in the caller
    try{
        const newCard = await prisma.card.create( {data: {
            ...info,
            pinned: false,
            board: {
                connect: {id: boardId}
            }
        }})
        return newCard;
    }
    catch(err){
        return null;
    }
}

router.post('/cards', async (req, res, next) => {
    try{

        const { title, description, gifUrl, boardId, owner } = req.body
        if(boardId && Number.isNaN(parseInt(boardId))){
            throw new ValidationError("Bad Request, boardId must be a number")
        }
        else if( title && description && gifUrl && boardId) {
            const { boardId, ...bodyExcludingBoardId } = req.body // destructuring to remove boardId from body, since using connect: notation in createCard
            const newCard = await createCard(parseInt(boardId), bodyExcludingBoardId)
            if(newCard){
                return res.status(200).json(newCard)
            }
            else{
                throw new NotFoundError(`Cant create card in Board with id ${boardId}, it does not exist`)
            }
        }
        else{
            throw new ValidationError("Invalid request, missing required fields (title, description, gifUrl, boardId)")
        }
    }
    catch(err){
        next(err)
    }

})

module.exports = router
