import 'joi'

declare module 'joi' {
  export interface Root {
    objectId: (message?: string | undefined) => () => StringSchema<string>
  }
}
