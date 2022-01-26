import express from 'express'
import { LoginController } from '../controllers/login-controller.js'
export const router = express.Router()
const loginController = new LoginController()

router.get('/', (req, res, next) => {
  const test = { login: req.session.username, title: 'Startpage' }
  res.render('./users/login', { test })
})
router.post('/', (req, res, next) => {
  loginController.loginUser(req, res, next)
})
