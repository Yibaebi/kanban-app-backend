import { Document, Model, Types } from 'mongoose'

// Create Task properties
export interface ICreateTask {
  boardID: Types.ObjectId
  title: string
  description?: string
  subtasks: string[]
  status: string
}

// Delete Task properties
export interface IDeleteTask {
  boardID: string
}

// Sub task props
export interface ISubTask {
  title: string
  isCompleted: boolean
}

// Task
export interface ITask {
  id: Types.ObjectId
  title: string
  description: string
  subtasks: ISubTask[]
  status: string
  createdAt: number
}

// Instance Methods
export interface ITaskMethods {
  addTask(task: ICreateTask): ITask
}

// Static methods
export interface TaskModel extends Model<ITask, object, ITaskMethods> {
  getTask(name?: string, boardID?: string): Promise<TaskDocumentInstance | null>
}

export type TaskDocumentInstance = Document<unknown, object, ITask> &
  Omit<
    ITask & {
      _id: Types.ObjectId
    },
    'addTask'
  > &
  ITaskMethods
