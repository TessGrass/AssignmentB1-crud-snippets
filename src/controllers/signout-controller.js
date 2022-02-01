/**
 * Controls the sign-out process.
 */
export class SignOutController {
  /**
   * Destroys the session when the user is logging out.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express respons object.
   */
  async destroySession (req, res) {
    await req.session.destroy()
    res.redirect('/login')
  }
}
