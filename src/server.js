/**
 * The main script file of the application.
 *
 * @author Therese Grass <tg222kv@student.lnu.se>
 */

import express from 'express'
import session from 'express-session'
// import { sessionOpt } from './config/sessions.js'
import { router } from './routes/router.js'
import expressLayouts from 'express-ejs-layouts'
import { connectDB } from './config/mongoose.js'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const app = express()
const directoryFullName = dirname(fileURLToPath(import.meta.url)) // Sökvägen från C:/ till src.
const baseURL = process.env.BASE_URL || '/'
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false })) // if removed, you can't add products.
app.use(express.static('public'))

try {
  await connectDB()
  app.listen(process.env.PORT)

  // View Engine Setup
  app.set('view engine', 'ejs')
  app.set('views', 'src/views/')
  app.use(expressLayouts)
  app.set('layout', join(directoryFullName, 'views', 'layouts', 'default'))

// Pass the base URL.
  app.use((req, res, next) => {
    res.locals.baseURL = baseURL
    next()
  })

// Register routes.
  app.use('/', router)
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
