import express from 'express'
import { SignOutController } from '../controllers/signout-controller.js'
export const router = express.Router()
const signOutController = new SignOutController()

router.get('/', signOutController.destroySession)
