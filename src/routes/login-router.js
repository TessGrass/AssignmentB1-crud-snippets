import express from 'express'
import { LoginController } from '../controllers/login-controller.js'
import csurf from 'csurf'
export const router = express.Router()
const loginController = new LoginController()

router.get('/', csurf(), loginController.renderLoginPage)
router.post('/', (req, res, next) => {
  loginController.authenticateAUser(req, res, next)
})
