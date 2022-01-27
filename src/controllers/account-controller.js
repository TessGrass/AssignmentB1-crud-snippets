import { Snippet } from '../models/snippets-model.js'
/**
 *
 */
export class AccountController {
  /**
   * @param req
   * @param res
   * @param next
   */
  async authorize (req, res, next) {
    console.log('------')
    console.log(req.session.username) // kolla om användaren har rätt att komma åt en resurs (kolla anv namnet. kolla session cookie.)
    if (req.session.username) {
      next()
    } else {
      req.session.flash = {
        type: 'failed',
        text: 'Please login before trying to access this content.'
      }
      res.redirect('./login')
    }

    // console.log(req.session.username) // = något namn i databasen findbyid()
  }

  /**
   * @param req
   * @param res
   * @param next
   */
  async userIndex (req, res, next) {
    try {
      console.log('inside user-index method')
      const data = { login: req.session.username, title: 'Account' }
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        id: obj._id,
        body: obj.body
      }))
      console.log(snippet)
      console.log('snippipdisnippi')
      res.render('../views/users/account', { snippet, data })
    } catch (error) {
      next(error)
    }
  }

  async viewUserSnippets (req, res, next) {
    try {
      const data = { login: req.session.username }
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        id: obj._id,
        body: obj.body
      }))
      console.log(snippet)
      console.log('snippipdisnippi')
      res.render('../views/users/account', { snippet, data }) // render to snippets
    } catch (error) {
      next(error)
    }
  }
}
