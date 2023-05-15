import { Types } from 'mongoose'

// Create Task properties
export interface ICreateTask {
  title: string
  description?: string
  subtasks: string[]
  status: string
}

// Sub task props
export interface IBoardSubTask {
  title: string
  isCompleted: boolean
}

// Task
export interface IBoardTask {
  id: Types.ObjectId
  title: string
  description: string
  subtasks: IBoardSubTask[]
  status: string
  createdAt: number
}
