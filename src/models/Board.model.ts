import _ from 'lodash'
import { Schema, Types, model } from 'mongoose'

import {
  BoardDocumentInstance,
  BoardModel,
  IBoard,
  IBoardMethods,
  IBoardTask,
  ICreateBoard,
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

// Columnizes a board
boardSchema.method('columnizeBoard', function (this: BoardDocumentInstance) {
  const boardColumnTasksMap: Record<string, IBoardTask[]> = {}

  for (const column of this.columns) {
    boardColumnTasksMap[column] = []
  }

  for (const task of this.tasks) {
    boardColumnTasksMap[task.status].push(task)
  }

  const boardProps = _.pick(this, ['_id', 'name', 'createdAt'])
  const board = {
    ...boardProps,
    columns: boardColumnTasksMap
  }

  return board
})

// Edits a board
boardSchema.method(
  'editBoard',
  function (this: BoardDocumentInstance, editProps: Partial<ICreateBoard>) {
    const newBoardColumns = editProps?.columns || []

    const existingColumns = this.columns
    const columnsToRemove = _.difference(existingColumns, newBoardColumns)

    // Update board values
    this.name = editProps.name || this.name
    this.columns = newBoardColumns
    this.tasks = this.tasks.filter(
      (task) => !columnsToRemove.includes(task.status)
    )
  }
)

// Instance method to add a task
boardSchema.method(
  'addTask',
  function (this: BoardDocumentInstance, task: ICreateTask) {
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
