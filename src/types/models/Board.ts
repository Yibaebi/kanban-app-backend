import { Document, Model, Types } from 'mongoose'
import { IBoardTask, ICreateTask } from './Task'

// Create board properties
export interface ICreateBoard {
  name: string
  columns: string[]
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

interface IColumnizedBoard {
  _id: Types.ObjectId
  columns: Record<string, IBoardTask[]>
  name: string
  createdAt: Date
}

// Instance Methods
export interface IBoardMethods {
  addTask(task: ICreateTask): IBoardTask
  columnizeBoard(): IColumnizedBoard
  editBoard(editValues: Partial<ICreateBoard>): void
}

// Static methods
export interface BoardModel extends Model<IBoard, object, IBoardMethods> {
  createBoard(board: ICreateBoard): Promise<BoardDocumentInstance>
}

export type BoardDocumentInstance = Document<unknown, object, IBoard> &
  Omit<
    IBoard & {
      _id: Types.ObjectId
    },
    'getColumns'
  > &
  IBoardMethods
