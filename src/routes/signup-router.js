import express from 'express'
import { SignUpController } from '../controllers/signup-controller.js'
export const router = express.Router()
const signUpController = new SignUpController()

router.get('/', (req, res, next) => {
  res.render('./users/signup', { title: 'Sign-up' })
})

router.post('/', (req, res, next) => {
  console.log('signup')
  console.log(req.body)
  signUpController.createUser(req, res, next)
})
