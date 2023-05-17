import { Document, Model, Types } from 'mongoose'
import { ITask, ICreateTask } from './Task'

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
export type IEditBoard = Partial<ICreateBoard>

// Board Properties
export interface IBoard extends Document {
  _id: Types.ObjectId
  name: string
  columns: string[]
  tasks: ITask[]
  createdAt: Date
}

interface IColumnizedBoard {
  _id: Types.ObjectId
  columns: Record<string, ITask[]>
  name: string
  createdAt: Date
}

// Instance Methods
export interface IBoardMethods {
  addTask(task: ICreateTask): ITask
  columnizeBoard(): IColumnizedBoard
  editBoard(editValues: IEditBoard): void
}

// Static methods
export interface BoardModel extends Model<IBoard, object, IBoardMethods> {
  findBoardByName(
    name?: string,
    boardID?: string
  ): Promise<BoardDocumentInstance | null>
}

export type BoardDocumentInstance = Document<unknown, object, IBoard> &
  Omit<
    IBoard &
      Required<{
        _id: Types.ObjectId
      }>,
    keyof IBoardMethods
  > &
  IBoardMethods
