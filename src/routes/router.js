import express from 'express'
// import { router as productsRouter } from './products-router.js'
import { router as homeRouter } from './home-router.js'
import { router as snippetsRouter } from './snippets-router.js'
import { router as signUpRouter } from './signup-router.js'
import { router as loginRouter } from './login-router.js'
import { router as accountRouter } from './account-router.js'
export const router = express.Router()

router.use('/', homeRouter)
router.use('/snippets', snippetsRouter)
router.use('/signup', signUpRouter)
router.use('/login', loginRouter)
router.use('/account', accountRouter) // AUTHORIZE before use

router.use((req, res) => {
  res.status(404).render('./errors/404', { title: 'Error' })
})
