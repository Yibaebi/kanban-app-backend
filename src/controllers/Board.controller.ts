import { Request, Response } from 'express'
import { Board } from '@models'
import { RES_CODE_MAP } from '@constants'
import { IBoardTask, ICreateTask } from '@root/types'
import mongoose from 'mongoose'

// Response Statuses
const { NOT_FOUND, OK } = RES_CODE_MAP

// Get a board
const getABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findById(boardID)

  if (!board) {
    res.status(NOT_FOUND).send({
      status: NOT_FOUND,
      data: null,
      message: `Board with id ${boardID} not found!`
    })
  }

  res.status(OK).send({
    status: OK,
    data: board,
    message: 'Board found successfully!'
  })

  return board
}

// Create a board
const createABoard = async (req: Request, res: Response) => {
  const board = new Board(req.body)
  await board.save()

  res.status(OK).send(board)
}

// Create a task
const createABoardTask = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findById(req.params.id)

  if (!board) {
    const message = `Board with id ${boardID} not found!`
    const resObj = { status: NOT_FOUND, data: null, message }

    res.status(NOT_FOUND).send(resObj)
  } else {
    const existingTasks = board.tasks

    const reqTask = req.body as ICreateTask
    const reqSubTasks = reqTask.subtasks

    const subtasks = reqSubTasks.map((subtask) => ({
      title: subtask,
      isCompleted: false
    }))

    const newTask = {
      id: new mongoose.Types.ObjectId(),
      ...reqTask,
      subtasks
    } as IBoardTask

    existingTasks.push(newTask)

    await board.save()
    res.status(OK).send(board)
  }

  res.end()
  // res.status(OK).send(board)
}

// Get all boards
const getAllBoards = async (req: Request, res: Response) => {
  const boards = await Board.find()

  res.status(OK).send({ data: boards, count: boards.length })
}

// Delete a board
const deleteABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findByIdAndDelete(boardID)

  if (!board) {
    res.status(NOT_FOUND).send({
      status: NOT_FOUND,
      data: null,
      message: `Board with id ${boardID} not found!`
    })
  }

  res.status(OK).send({ data: board, message: 'Board deleted successfully!' })
}

export { getABoard, createABoard, getAllBoards, createABoardTask, deleteABoard }
