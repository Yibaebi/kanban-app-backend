import _ from 'lodash'
import { Schema, Types, model } from 'mongoose'

import {
  BoardMethodContext,
  BoardModel,
  IBoard,
  IBoardMethods,
  IBoardTask,
  ICreateTask
} from '@root/types'

// Board Schema
const boardSchema = new Schema<IBoard, BoardModel, IBoardMethods>({
  name: {
    type: String,
    required: true
  },
  columns: {
    type: [String],
    default: []
  },
  tasks: {
    type: [
      {
        title: {
          type: String,
          required: true
        },
        description: String,
        subtasks: {
          type: [{ isCompleted: Boolean, title: String }],
          default: []
        },
        status: {
          type: String,
          required: true
        }
      }
    ],
    default: []
  },
  createdAt: { type: Date, default: Date.now() }
})

// Retrieves columns of this board
boardSchema.method('getColumns', function (this: BoardMethodContext) {
  return this.columns
})

// Retrieves a columnize board
boardSchema.method('columnizeBoard', function (this: BoardMethodContext) {
  const boardColumnTasksMap: Record<string, IBoardTask[]> = {}

  for (const task of this.tasks) {
    boardColumnTasksMap[task.status] = boardColumnTasksMap[task.status] || []
    boardColumnTasksMap[task.status].push(task)
  }

  const value = {
    ..._.pick(this, ['_id', 'name', 'createdAt']),
    columns: boardColumnTasksMap
  }

  return value
})

// Instance method to add a task
boardSchema.method(
  'addTask',
  function (this: BoardMethodContext, task: ICreateTask) {
    const reqSubTasks = _.uniq(task.subtasks)

    // Create subtasks with statuses
    const subtasks = reqSubTasks.map((subtask) => ({
      title: subtask,
      isCompleted: false
    }))

    const newTask = {
      id: new Types.ObjectId(),
      ...task,
      subtasks
    } as IBoardTask

    this.tasks.push(newTask)

    return newTask
  }
)

// Board Model
const Board = model<IBoard, BoardModel>('Board', boardSchema)

export { Board, boardSchema }
