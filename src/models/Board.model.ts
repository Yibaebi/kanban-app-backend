import { Schema, model } from 'mongoose'

import {
  BoardMethodContext,
  BoardModel,
  IBoard,
  IBoardMethods
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

boardSchema.method('getColumns', function getColumns(this: BoardMethodContext) {
  return this.columns
})

// Board Model
const Board = model<IBoard, BoardModel>('Board', boardSchema)

export { Board, boardSchema }
