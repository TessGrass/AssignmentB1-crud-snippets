import express from 'express'
import { SignUpController } from '../controllers/signup-controller.js'
export const router = express.Router()
const signUpController = new SignUpController()

router.get('/', (req, res, next) => {
  const data = { login: req.session.username, title: 'Sign-Up' }
  res.render('./users/signup', { data })
})

router.post('/', (req, res, next) => {
  console.log('signup')
  console.log(req.body)
  signUpController.createUser(req, res, next)
})
