/**
 * The main script file of the application.
 *
 * @author Therese Grass <tg222kv@student.lnu.se>
 */

import express from 'express'
import session from 'express-session'
import { sessionOpt } from './config/sessions.js'
import csurf from 'csurf'
import { router } from './routes/router.js'
import expressLayouts from 'express-ejs-layouts'
import { connectDB } from './config/mongoose.js'
import logger from 'morgan'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import helmet from 'helmet'
const app = express()
const directoryFullName = dirname(fileURLToPath(import.meta.url)) // Search path from C:/ to src.
const baseURL = process.env.BASE_URL || '/'
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false })) // if removed, you can't add products.
app.use(express.static(join(directoryFullName, '..', 'public')))

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

  app.use(helmet())
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'script-src': ["'self'", 'cdn.jsdelivr.net']
      }
    })
  )

  if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    sessionOpt.cookie.secure = true // serve secure cookies
  }

  app.use(session(sessionOpt))

  app.use((req, res, next) => {
    if (req.session.flash) {
      res.locals.flash = req.session.flash
      delete req.session.flash
    }
    if (req.session.username) {
      res.locals.username = req.session.username
    }
    next()
  })

  app.use(csurf())

  // Register routes.
  app.use('/', router)

  app.use(function (err, req, res, next) {
    if (err.status === 404) {
      return res.status(404).render(join(directoryFullName, 'views', 'errors', '404.ejs'))
    } else if (err.status === 403) {
      return res.status(403).render(join(directoryFullName, 'views', 'errors', '403.ejs'))
    } else if (err.status === 500) {
      return res.status(500).render(join(directoryFullName, 'views', 'errors', '500.ejs'))
    }
  })
} catch (err) {
  console.error(err)
  process.exitCode = 1
}
