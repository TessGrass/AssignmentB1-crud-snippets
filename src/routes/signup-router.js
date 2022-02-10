import express from 'express'
import { SignUpController } from '../controllers/signup-controller.js'
export const router = express.Router()
const signUpController = new SignUpController()

router.get('/', signUpController.renderSignUpPage)
router.post('/', (req, res, next) => {
  signUpController.createUser(req, res, next)
})
