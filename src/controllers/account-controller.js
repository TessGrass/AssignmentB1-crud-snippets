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
      const data = { login: req.session.username, title: 'Account' }
      const snippet = (await Snippet.find()).map(obj => ({
        title: obj.title,
        body: obj.body,
        id: obj._id,
        author: obj.author
      }))
      console.log(snippet)
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
        body: obj.body,
        author: obj.author
      }))
      console.log(snippet)
      console.log('snippipdisnippi')
      res.render('../views/users/account', { snippet, data }) // render to snippets
    } catch (error) {
      next(error)
    }
  }

  async createSnippet (req, res, next) {
      console.log('createsnippet')
    try {
      const createSnippet = new Snippet({
        title: req.body.name,
        body: req.body.usersnippet,
        author: req.body.authorname
      })
      await createSnippet.save()
      // ...redirect to the list of products.
      // res.render('../views/users/account', { newSnippet, data })
      res.redirect('./account')
    } catch (error) {
      next(error)
    }
  }

  async updateSnippet (req, res, next) {
      console.log('härkljhk')
      console.log(req.body.id)
    try {
     const snippet = await Snippet.findById(req.body.id)
      if (snippet) {
        snippet.title = req.body.name
        snippet.body = req.body.usersnippet
        snippet.author = req.body.authorname
        await snippet.save()
      }
      req.session.flash = {
        type: 'success', text: 'The item was updated successfully.'
      }
      /* const data = { title: 'Update Snippet' }
      await res.render('./users/update', { snippet, data }) */
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
}
}
