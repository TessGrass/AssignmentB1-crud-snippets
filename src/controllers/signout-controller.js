/**
 * Controls the sign-out process.
 */
export class SignOutController {
  /**
   * Destroys the session when the user logs out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   * @param {Function} next - Express next middleware function.
   * @returns {object} - Returns an error object.
   */
  async destroySession (req, res, next) {
    try {
      if (req.session.username === undefined) {
        const err = new Error('PageNotFound')
        err.status = 404
        return next(err)
      } else {
        await req.session.destroy()
        res.redirect('./login')
      }
    } catch (error) {
      next(error)
    }
  }
}
