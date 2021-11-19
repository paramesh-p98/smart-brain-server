const handleSignin = (req, res, knex, bcrypt) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json('incorrect form submission')
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isvalid = bcrypt.compareSync(req.body.password, data[0].hash);
            console.log(isvalid)
            if (isvalid) {
                return knex.select('*').from('users')
                    .where('email', '=', req.body.email)
                    .then(user => {
                        console.log(user)
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'))
            } else {
                res.status(400).json("Wrong Credentials")
            }
        })
        .catch(err => res.status(400).json("Wrong credentials"));
}


module.exports = {
    handleSignin: handleSignin
}