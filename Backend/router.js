const express = require('express')
const { PrismaClient, Category } = require('./generated/prisma')
const { ValidationError, NotFoundError } = require('./errors')

const router = express.Router()

const prisma = new PrismaClient()

const createBoard = async (info) => {
    const newBoard = await prisma.board.create({
        data: {
            ...info,
            category: Category[info.category.toUpperCase()]
        }
    })
    return newBoard
}

const getBoards = async () => {
    const boards = await prisma.board.findMany()
    return boards
}

const getBoardById = async (boardId) => {
    const board = await prisma.board.findUnique({ where: { id: boardId } })
    return board
}

const deleteBoard = async (boardId) => { //prisma client delete can throw its own PrismaClientKnownRequestError which I want to be handled as my custom defined NotFoundError, hence the try catch, so the NotFoundError can be caught by the error handler can be handled in the caller
    try {
        const board = await prisma.board.delete({ where: { id: boardId } })
        return board
    } catch (err) {
        return null
    }
}
router.post('/boards', async (req, res, next) => {
    const { title, category, coverImg, author } = req.body
    if (title && Object.values(Category).includes(category) && coverImg && author) {
        const newBoard = await createBoard(req.body)
        return res.status(200).json(newBoard)
    }
    else {
        next(new ValidationError("Invalid request, missing required fields (title, category, coverImg, author)"))
    }

})

router.get('/boards', async (req, res, next) => {

    const boards = await getBoards()
    if (boards) {
        res.status(200).json(boards).send()
    }
    else {
        next(new NotFoundError("No boards found"))
    }

})

router.get('/boards/:boardId', async (req, res, next) => {

    const boardId = parseInt(req.params.boardId)
    if (!Number.isNaN(boardId)) {
        const board = await getBoardById(parseInt(boardId))
        if (board) {
            res.status(200).json(board)
        }
        else {
            next(new NotFoundError(`Board with id ${boardId} does not exist`))
        }
    }
    else if (Number.isNaN(boardId)) {
        next(ValidationError("Bad Request, boardId must be a number"))
    }
    else {
        next(ValidationError("Bad Request, missing required fields (boardId)"))
    }
})

router.delete('/boards/:boardId', async (req, res, next) => {

    const boardId = parseInt(req.params.boardId)
    if (boardId && !Number.isNaN(boardId)) {
        const board = await deleteBoard(boardId)
        if (board) {
            return res.status(204).send()
        }
        else {
            next(new NotFoundError(`Board with id ${boardId} does not exist`))
        }
    }
    else if (boardId && Number.isNaN(boardId)) {
        next(new ValidationError("Bad Request, boardId must be a number"))
    }
    else {
        next(new ValidationError("Bad Request, missing required fields (id)"))
    }

})

//card routes

const createCard = async (boardId, info) => { //prisma client delete can throw its own PrismaClientKnownRequestError which I want to be handled as my custom defined NotFoundError, hence the try catch, so the NotFoundError can be caught by the error handler can be handled in the caller
    try {
        const newCard = await prisma.card.create({
            data: {
                ...info,
                pinned: false,
                board: {
                    connect: { id: boardId }
                }
            }
        })
        return newCard
    }
    catch (err) {
        console.log(err)
        return null
    }
}
const getCards = async (boardId) => {
    try {
        const board = await prisma.board.findFirst({
            where: { id: boardId },
            include: { cards: true }
        })
        return board.cards
    }
    catch (err) {
        return null
    }
}
const deleteCard = async (cardId) => {
    try {
        const card = await prisma.card.delete({ where: { id: cardId } })
        return card
    } catch (err) {
        console.error(`Error deleting card with id ${cardId}:`, err)
        return null
    }
}
const upvoteCard = async (cardId) => {
    try {
        const card = await prisma.card.update({
            where: { id: cardId },
            data: {
                upvotes: {
                    increment: 1
                }
            }
        })
        return card
    } catch (err) {
        console.error(`Error upvoting card with id ${cardId}:`, err)
        return null
    }
}
const getComments = async (cardId) => {
    try {
        const card = await prisma.card.findUnique({
            where: { id: cardId },
            include: { comments: true }
        })
        return card ? card.comments : null
    } catch (err) {
        console.error(`Error fetching comments for card with id ${cardId}:`, err)
        return null
    }
}

const addComment = async (cardId, info) => {
    try {
        const newComment = await prisma.comment.create({
            data: {
                ...info,
                card: {
                    connect: { id: cardId }
                }
            }
        })
        return newComment
    } catch (err) {
        console.error(`Error adding comment to card with id ${cardId}:`, err)
        return null
    }
}


router.post('/boards/:boardId/cards', async (req, res, next) => {

    const { title, description, gifUrl, owner } = req.body
    const boardId = parseInt(req.params.boardId)
    console.log(boardId)
    if (title && description && gifUrl && boardId) { // destructuring to remove boardId from body, since using connect: notation in createCard
        const newCard = await createCard(boardId, req.body)
        if (newCard) {
            return res.status(200).json(newCard)
        }
        else {
            next(new NotFoundError(`Cant create card in Board with id ${boardId}, it does not exist`))
        }
    }
    else if (Number.isNaN(boardId)) {
        next(new ValidationError("Bad Request, boardId must be a number"))
    }
    else {
        next(new ValidationError("Invalid request, missing required fields (title, description, gifUrl)"))
    }

})

router.get('/boards/:boardId/cards', async (req, res, next) => {
        const boardId = parseInt(req.params.boardId)
        if (boardId && !Number.isNaN(boardId)) {
            const cards = await getCards(boardId)
            if (cards) {
                return res.status(200).json(cards)
            }
            else {
                next(new NotFoundError(`Board with id ${boardId} does not exist`))
            }
    }
        else if (Number.isNaN(boardId)) {
            next(new ValidationError("Bad Request, boardId must be a number"))
        }
        else {
            next(new ValidationError("Bad Request, missing required fields (boardId)"))
        }

})

router.delete('/boards/:boardId/cards/:cardId', async (req, res, next) => {
    const cardId = parseInt(req.params.cardId)
    if (!Number.isNaN(cardId)) {
        const card = await deleteCard(cardId)
        if (card) {
            return res.status(204).send()
        } else {
            next(new NotFoundError(`Card with id ${cardId} does not exist`))
        }
    } else {
        next(new ValidationError("Bad Request, cardId must be a number"))
    }
})

router.patch('/boards/:boardId/cards/:cardId/upvote', async (req, res, next) => {
    const cardId = parseInt(req.params.cardId)
    if (!Number.isNaN(cardId)) {
        const card = await upvoteCard(cardId)
        if (card) {
            return res.status(200).json(card)
        } else {
            next(new NotFoundError(`Card with id ${cardId} does not exist`))
        }
    } else {
        next(new ValidationError("Bad Request, cardId must be a number"))
    }
})

router.get('/boards/:boardId/cards/:cardId/comments', async (req, res, next) => {
    const cardId = parseInt(req.params.cardId)
    if (!Number.isNaN(cardId)) {
        const comments = await getComments(cardId)
        if (comments) {
            return res.status(200).json(comments)
        } else {
            next(new NotFoundError(`Card with id ${cardId} does not exist or has no comments`))
        }
    } else {
        next(new ValidationError("Bad Request, cardId must be a number"))
    }
})

router.post('/boards/:boardId/cards/:cardId/comments', async (req, res, next) => {
    const cardId = parseInt(req.params.cardId)
    const { messageBody } = req.body
    if (!Number.isNaN(cardId) && messageBody) {
        const newComment = await addComment(cardId, req.body)
        if (newComment) {
            console.log("cardId: ", cardId)
            return res.status(201).json(newComment)
        } else {
            next(new NotFoundError(`Card with id ${cardId} does not exist`))
        }
    } else if (Number.isNaN(cardId)) {
        next(new ValidationError("Bad Request, cardId must be a number"))
    } else {
        next(new ValidationError("Invalid request, missing required field: messageBody; author is Optional"))
    }
})


module.exports = router
