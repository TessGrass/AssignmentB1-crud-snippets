import { User } from '../models/user-model.js'

export class SignUpController {
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async createUser (req, res, next) {
    console.log(req.body)
    try {
      const createUser = new User({
        username: req.body.username,
        password: req.body.password
      })

      await createUser.save()
      req.session.flash = {
        type: 'success', text: 'The account was created successfully!'
      }
      await res.redirect('/snippets')
    } catch (error) {
      console.log('feil')
      req.session.flash = { type: 'danger', text: 'The username is already taken. Please try again.' }
      await res.redirect('/signup')
    }
  }
}

