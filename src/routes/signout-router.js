import express from 'express'
import { SignOutController } from '../controllers/signout-controller.js'
export const router = express.Router()
const signOutController = new SignOutController()

router.get('/', (req, res) => {
    signOutController.destroySession(req, res)
    const data = { title: 'Login' }
    res.redirect('/login')
    res.render('./users/login', { data })
  })

/* router.get('/signout', (req, res, next) => {
    console.log('dfgdfgdfgdfgdfg')
  console.log(req.body)
  signOutController.destroySession(req, res, next)
}) */
