import express from 'express'
import { LoginController } from '../controllers/login-controller.js'
export const router = express.Router()
const loginController = new LoginController()

router.get('/', (req, res, next) => {
  res.render('./users/login', { title: 'Login' })
})
router.post('/', (req, res, next) => {
  loginController.loginUser(req, res, next)
})
