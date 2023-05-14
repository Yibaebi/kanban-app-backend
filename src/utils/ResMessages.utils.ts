// Response message for not found queries
export const getNotFoundMsg = (id: string, model: string) =>
  `${model} with id ${id} not found!`

// Response message for not add queries
export const getAddSuccessMsg = (model: string) =>
  `${model} added successfully!`

// Response message for find queries
export const getFoundSuccessMsg = (model: string) =>
  `${model} found successfully!`

// Response message for create queries
export const getCreateSuccessMsg = (model: string) =>
  `${model} created successfully!`

// Response message for create queries
export const getUpdateSuccessMessage = (model: string) =>
  `${model} updated successfully!`

// Response message for delete queries
export const getDeleteSuccessMsg = (model: string) =>
  `${model} deleted successfully!`

// Response message for bad requests
export const getBadRequestMsg = () => `Invalid request`
