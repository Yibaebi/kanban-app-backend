import { Request, Response } from 'express'

import * as utils from '@utils'
import { Board } from '@models'
import { RES_CODE_MAP } from '@constants'
import { ICreateBoard, IEditBoard } from '@root/types'

// Message getters
const {
  getCreateSuccessMsg,
  getDeleteSuccessMsg,
  getFoundSuccessMsg,
  getNotFoundMsg,
  getUpdateSuccessMessage
} = utils

// Response Statuses
const { NOT_FOUND, OK, CONFLICT } = RES_CODE_MAP

// Get a board
export const getABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const board = await Board.findById(boardID)

  if (board) {
    return res.status(OK).send({
      data: board.columnizeBoard(),
      message: getFoundSuccessMsg('Board')
    })
  }

  res
    .status(NOT_FOUND)
    .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
}

// Create a board
export const createABoard = async (req: Request, res: Response) => {
  const boardReqProps = req.body as ICreateBoard

  const boardName = boardReqProps.name.trim()
  const boardWithSameName = await Board.findBoardByName(boardName)

  if (boardWithSameName) {
    return res.status(CONFLICT).send({
      data: null,
      message: `Conflict! ${boardName} already exists.`
    })
  }

  const board = new Board(boardReqProps)
  await board.save()

  res.status(OK).send({
    data: board.columnizeBoard(),
    message: getCreateSuccessMsg('Board')
  })
}

// Get all boards
export const getAllBoards = async (_: Request, res: Response) => {
  const boards = await Board.find({})

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

  res.status(OK).send({
    data: board.columnizeBoard(),
    message: getDeleteSuccessMsg('Board')
  })
}

// Update a board
export const updateABoard = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const boardUpdateValues = req.body as IEditBoard

  const boardName = boardUpdateValues.name
  const boardWithSameName = await Board.findBoardByName(boardName, boardID)

  if (boardWithSameName) {
    return res.status(CONFLICT).send({
      data: null,
      message: `Conflict! ${boardName} already exists.`
    })
  }

  const board = await Board.findById(boardID)

  if (board) {
    board.editBoard(boardUpdateValues)
    await board.save()

    return res.status(OK).send({
      data: board.columnizeBoard(),
      message: getUpdateSuccessMessage('Board')
    })
  }

  res
    .status(NOT_FOUND)
    .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
}
