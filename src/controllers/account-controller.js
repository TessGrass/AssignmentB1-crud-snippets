
export class AccountController {
    
    async authorize (req, res, next) { // kolla om användaren har rätt att komma åt en resurs (kolla anv namnet. kolla session cookie.)
    try {
      console.log('------')
      console.log(await req.params)
      // console.log(req.session.username) // = något namn i databasen findbyid()
      next()
    } catch (error) {
      next(error)
    }
  }

/*   async userIndex(req, res, next) {
      try {
          console.log('123123123')
          res.render('../views/users/account')
      } catch(error) {
          next(error)
      }
  }
} */
}
