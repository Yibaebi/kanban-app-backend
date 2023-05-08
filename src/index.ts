import { startupConfig, startupDb, startupValidation } from './start'

// Setup validation
startupValidation()

// Setup application config
startupConfig()

// DB setup
startupDb()
