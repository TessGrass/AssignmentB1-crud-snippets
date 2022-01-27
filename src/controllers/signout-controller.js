
export class SignOutController {

    async destroySession (req, res) {
    console.log('DESTROY!')
    await req.session.destroy()
  }
}
