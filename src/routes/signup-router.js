import express from 'express'
import { SignUpController } from '../controllers/signup-controller.js'
export const router = express.Router()
const signUpController = new SignUpController()

router.get('/', signUpController.renderSignUpPage)
/* router.get('/', (req, res, next) => {
  const data = { login: req.session.username }
  res.render('./users/signup', { data })
}) */

router.post('/', (req, res, next) => {
  signUpController.createUser(req, res, next)
})
