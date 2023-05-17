import { Request, Response } from 'express'

import * as utils from '@utils'
import { Board } from '@models'
import { RES_CODE_MAP } from '@constants'
import { ICreateTask } from '@root/types'
import { Types } from 'mongoose'

// Message getters
const { getAddSuccessMsg, getNotFoundMsg, getDeleteSuccessMsg } = utils

// Response Statuses
const { NOT_FOUND, OK, BAD_REQUEST } = RES_CODE_MAP

// Create a task
export const createABoardTask = async (req: Request, res: Response) => {
  const task = req.body as ICreateTask

  const boardID = req.body.boardID as string
  const board = await Board.findById(boardID)

  if (Number(board?.columns.length) < 1) {
    return res.status(BAD_REQUEST).send({
      data: null,
      message: `You need at lest one column on this board to add a task.`
    })
  }

  if (!board?.columns.includes(task.status)) {
    return res
      .status(BAD_REQUEST)
      .send({ data: null, message: `Task status must be a valid column!` })
  }

  if (!board) {
    res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
  }

  const addedTask = board.addTask(task)
  await board.save()

  return res
    .status(OK)
    .send({ data: addedTask, message: getAddSuccessMsg('Task') })
}

// Create a task
export const deleteABoardTask = async (req: Request, res: Response) => {
  const taskID = req.params.id as unknown as Types.ObjectId
  const boardID = req.body.boardID as string

  const board = await Board.findById(boardID)

  const taskToDelete = board?.tasks.find((task) => task.id === taskID)

  if (!taskToDelete) {
    return res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(String(taskID), 'Task') })
  }

  if (board) {
    board.tasks = board.tasks.filter((task) => task.id !== taskID)
    await board.save()

    return res
      .status(OK)
      .send({ data: taskToDelete, message: getDeleteSuccessMsg('Task') })
  }

  res
    .status(NOT_FOUND)
    .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
}
