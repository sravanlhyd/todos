const User = require('../model/user');

const loging = async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Check credentials'})
        }
        await user.generateAuthToken()

        res.send({ user })

    } catch (error) {
        res.status(400).send("Not a valid user")
    }

}

const signup = async(req, res) => {
     // Create a new user
     try {
         console.log(req.body)
        const { firstName, lastName, email, password } = req.body
          const user = new User({ firstName, lastName, email, password});
          const token = await user.generateAuthToken()
          await user.save()
          res.status(201).send({ user, token })
      } catch (error) {
          console.log(error)
          res.status(400).send(error)
      }
}



module.exports = { loging, signup }