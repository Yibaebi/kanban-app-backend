import _ from 'lodash'
import { Request, Response } from 'express'

import * as utils from '@utils'
import { Board } from '@models'
import { RES_CODE_MAP } from '@constants'
import { ICreateBoard, ICreateTask } from '@root/types'

// Message getters
const {
  getAddSuccessMsg,
  getCreateSuccessMsg,
  getDeleteSuccessMsg,
  getFoundSuccessMsg,
  getNotFoundMsg,
  getUpdateSuccessMessage
} = utils

// Response Statuses
const { NOT_FOUND, OK, BAD_REQUEST } = RES_CODE_MAP

// Get a board
const getABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findById(boardID)

  if (board) {
    const boardResValue = board.columnizeBoard()

    return res
      .status(OK)
      .send({ data: boardResValue, message: getFoundSuccessMsg('Board') })
  }

  res
    .status(NOT_FOUND)
    .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
}

// Create a board
const createABoard = async (req: Request, res: Response) => {
  const board = new Board(req.body as ICreateBoard)
  await board.save()

  res.status(OK).send({ data: board, message: getCreateSuccessMsg('Board') })
}

// Create a task
const createABoardTask = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findById(boardID)

  const task = req.body as ICreateTask

  if (!board?.columns.includes(task.status.toLowerCase())) {
    return res
      .status(BAD_REQUEST)
      .send({ data: null, message: `Task status must match a valid column!` })
  }

  if (board) {
    const addedTask = board.addTask(task)
    await board.save()

    return res
      .status(OK)
      .send({ data: addedTask, message: getAddSuccessMsg('Task') })
  }

  res
    .status(NOT_FOUND)
    .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
}

// Get all boards
const getAllBoards = async (_: Request, res: Response) => {
  const boards = await Board.find()

  res.status(OK).send({ data: boards, count: boards.length })
}

// Delete a board
const deleteABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findByIdAndDelete(boardID)

  if (!board) {
    return res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
  }

  res.status(OK).send({ data: board, message: getDeleteSuccessMsg('Board') })
}

// Update a board
const updateABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findById(boardID)

  if (board) {
    const boardUpdateValue = req.body as Partial<ICreateBoard>
    const newBoardColumns = boardUpdateValue?.columns || []

    const existingColumns = await board.getColumns()
    const columnsToRemove = _.difference(existingColumns, newBoardColumns)

    // Update board values
    board.name = boardUpdateValue.name || board.name
    board.columns = newBoardColumns
    board.tasks = board.tasks.filter(
      (task) => !columnsToRemove.includes(task.status)
    )

    await board.save()

    return res
      .status(OK)
      .send({ data: board, message: getUpdateSuccessMessage('Board') })
  }

  res
    .status(NOT_FOUND)
    .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
}

export {
  getABoard,
  createABoard,
  getAllBoards,
  createABoardTask,
  deleteABoard,
  updateABoard
}
