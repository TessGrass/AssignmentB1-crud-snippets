
export class SignOutController {

    async destroySession (req, res) {
    await req.session.destroy()
    res.redirect('/login')
  }
}
