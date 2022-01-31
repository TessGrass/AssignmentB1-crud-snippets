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
      console.log(req.session.username)
 // kolla om användaren har rätt att komma åt en resurs (kolla anv namnet. kolla session cookie.)
    if (req.session.username) {
      next()
    } else {
      req.session.flash = {
        type: 'danger',
        text: 'Please login before trying to access this content.'
      }
      res.redirect('/')
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
      console.log()
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
      res.render('../views/users/account', { snippet, data }) // render to snippets
    } catch (error) {
      next(error)
    }
  }

  async createSnippet (req, res, next) {
    try {
      const createSnippet = new Snippet({
        title: req.body.name,
        body: req.body.usersnippet,
        author: req.body.authorname
      })
      await createSnippet.save()
      req.session.flash = {
        type: 'success', text: 'The snippet was created successfully!'
      }
      const data = { title: 'Account' }
      res.render('../views/users/account', { createSnippet, data })
      res.redirect('./account')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
  }

  async updateSnippet (req, res, next) {
    try {
     const snippet = await Snippet.findById(req.body.id)
      if (snippet) {
        snippet.title = req.body.title
        snippet.body = req.body.body
        snippet.author = req.body.author
        await snippet.save()
      }
      req.session.flash = {
        type: 'success', text: 'The snippet was updated successfully.'
      }
      const data = { title: 'Update Snippet' }
      await res.render('./users/account', { data })
      await res.redirect('.')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
  }

  async renderUpdate(req, res, next) {
      console.log('render update')
    const id = req.params.id
    const result = await Snippet.findById(id)
    const data = { name: result, title: 'Update Snippet' }
    res.render('./users/update', { data })
  }

  async deleteSnippet (req, res, next) {
    try {
        console.log('dflgkjdfglkjdfglkjdfgdflgkjdfglkjdfg')
      console.log(req.body.id)
    await Snippet.findByIdAndDelete(req.body.id)
    req.session.flash = {
      type: 'success', text: 'The snippet was deleted successfully.'
    }
    await res.redirect('./')
    } catch (error) {
      req.session.flash = { type: 'danger', text: error.message }
      next(error)
    }
}
}
