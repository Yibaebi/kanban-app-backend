import { Request, Response } from 'express'

import * as utils from '@utils'
import { Board } from '@models'
import { RES_CODE_MAP } from '@constants'
import { ICreateBoard } from '@root/types'

// Message getters
const {
  getCreateSuccessMsg,
  getDeleteSuccessMsg,
  getFoundSuccessMsg,
  getNotFoundMsg,
  getUpdateSuccessMessage
} = utils

// Response Statuses
const { NOT_FOUND, OK } = RES_CODE_MAP

// Get a board
export const getABoard = async (req: Request, res: Response) => {
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
export const createABoard = async (req: Request, res: Response) => {
  const board = new Board(req.body as ICreateBoard)
  await board.save()

  const columnizedBoard = board.columnizeBoard()

  res
    .status(OK)
    .send({ data: columnizedBoard, message: getCreateSuccessMsg('Board') })
}

// Get all boards
export const getAllBoards = async (_: Request, res: Response) => {
  const boards = await Board.find()

  res.status(OK).send({ data: boards, count: boards.length })
}

// Delete a board
export const deleteABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findByIdAndDelete(boardID)

  if (!board) {
    return res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
  }

  const resData = board.columnizeBoard()

  res.status(OK).send({ data: resData, message: getDeleteSuccessMsg('Board') })
}

// Update a board
export const updateABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findById(boardID)

  if (board) {
    const boardUpdateValues = req.body as Partial<ICreateBoard>

    board.editBoard(boardUpdateValues)
    await board.save()

    const resData = board.columnizeBoard()

    return res
      .status(OK)
      .send({ data: resData, message: getUpdateSuccessMessage('Board') })
  }

  res
    .status(NOT_FOUND)
    .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
}
