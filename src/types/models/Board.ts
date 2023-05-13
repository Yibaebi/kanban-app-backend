import { Document, Model, Types } from 'mongoose'

// Create board properties
export interface ICreateBoard {
  name: string
  columns: string[]
}

// Create Task properties
export interface ICreateTask {
  title: string
  description?: string
  subtasks: string[]
  status: string
}

// Create board properties
export interface ICreateBoard {
  name: string
  columns: string[]
}

// Edit board properties
export type IEditBoard = ICreateBoard

// Board Properties
export interface IBoard extends Document {
  _id: Types.ObjectId
  name: string
  columns: string[]
  tasks: IBoardTask[]
  createdAt: Date
}

export interface IBoardTask {
  id: Types.ObjectId
  title: string
  description: string
  subtasks: IBoardSubTask[]
  status: string
  createdAt: number
}

export interface IBoardSubTask {
  title: string
  isCompleted: boolean
}

// Instance Methods
export interface IBoardMethods {
  getColumns(): Promise<string[]>
}

// Static methods
export interface BoardModel extends Model<IBoard, object, IBoardMethods> {
  createBoard(board: ICreateBoard): Promise<BoardMethodContext>
}

export type BoardMethodContext = Document<unknown, object, IBoard> &
  Omit<
    IBoard & {
      _id: Types.ObjectId
    },
    'getColumns'
  > &
  IBoardMethods
