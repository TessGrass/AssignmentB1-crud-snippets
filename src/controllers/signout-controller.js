/**
 * Controls the sign-out process.
 */
export class SignOutController {
  /**
   * Destroys the session when the user is logging out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {object} next - Express next middleware function.
   */
  async destroySession (req, res, next) {
    try {
      if (req.session.username === undefined) {
        const err = new Error('PageNotFound')
        err.status = 404
        next(err)
      } else {
        await req.session.destroy()
        res.redirect('/login')
      }
    } catch (error) {
      next(error)
    }
  }
}
