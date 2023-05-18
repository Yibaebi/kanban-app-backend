import { Request, Response } from 'express'

import * as utils from '@utils'
import { Board } from '@models'
import { RES_CODE_MAP } from '@constants'
import { ICreateTask } from '@root/types'
import _ from 'lodash'

// Message getters
const {
  getAddSuccessMsg,
  getNotFoundMsg,
  getDeleteSuccessMsg,
  getUpdateSuccessMessage
} = utils

// Response Statuses
const { NOT_FOUND, OK, BAD_REQUEST } = RES_CODE_MAP

// Create a task
export const createABoardTask = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const task = req.body as ICreateTask

  const board = await Board.findById(boardID)

  if (Number(board?.columns.length) < 1) {
    return res.status(BAD_REQUEST).send({
      data: null,
      message: 'You need at lest one column on this board to add a task.'
    })
  }

  if (!board?.columns.includes(task.status)) {
    return res
      .status(BAD_REQUEST)
      .send({ data: null, message: 'Task status must be a valid column!' })
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

// Delete a task
export const deleteABoardTask = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const taskID = req.params.taskID

  const board = await Board.findById(boardID)

  if (!board) {
    return res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
  }

  const taskToDelete = board?.tasks.find((task) => String(task._id) === taskID)

  if (!taskToDelete) {
    return res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(taskID, 'Task') })
  }

  board.tasks = board.tasks.filter((task) => String(task._id) !== taskID)

  await board.save()

  return res
    .status(OK)
    .send({ data: taskToDelete, message: getDeleteSuccessMsg('Task') })
}

// Update a task
export const updateABoardTask = async (req: Request, res: Response) => {
  const boardID = req.params.id
  const taskID = req.params.taskID
  const taskDetails: Partial<ICreateTask> = req.body

  const board = await Board.findById(boardID)

  if (!board) {
    return res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(boardID, 'Board') })
  }

  let taskToUpdate = board?.tasks.find((task) => String(task._id) === taskID)

  if (!taskToUpdate) {
    return res
      .status(NOT_FOUND)
      .send({ data: null, message: getNotFoundMsg(taskID, 'Task') })
  }

  if (!board.columns.includes(String(taskDetails.status))) {
    return res
      .status(BAD_REQUEST)
      .send({ data: null, message: 'Task status must be a valid column!' })
  }

  if (taskDetails?.subtasks && taskDetails.subtasks.length > 0) {
    taskToUpdate.subtasks = board.createSubtasksWithStatuses(
      taskDetails.subtasks
    )
  }

  taskToUpdate = _.merge(taskToUpdate, _.omit(taskDetails, 'subtasks'))

  await board.save()

  return res
    .status(OK)
    .send({ data: taskToUpdate, message: getUpdateSuccessMessage('Task') })
}
