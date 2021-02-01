const {Router} = require('express')
const config = require('config')
const shortid = require('shortid')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

// the 'auth' is for the unauthorized users not to enter or have access
router.post('/generate', auth, async (req, res) => {
  try {
    const baseUrl = config.get('baseUrl')
    // we are receiving the object 'from' from the frontend 
    //in the very end we gonna redirect the user on this 'from' route
    const {from} = req.body

    // we are installing the shortid library
    // when we are calling the method 'generate' of the object 'shortid' we are receiving a unique code
    const code = shortid.generate()
    //here we are checking if there is a 'from' link in the database
    const existing = await Link.findOne({ from })
    // if in this variable there is something, then we just send it as a response in json format
    if (existing) {
      return res.json({ link: existing })
    }

    // here we have the shortened link which will work with our service
    // '/t/' === an abbreviation of const 'to', which os one of the routes
    const to = baseUrl + '/t/' + code

    const link = new Link({
      code, to, from, owner: req.user.userId
    })

    // 'link.save()' returns a Promise
    await link.save()

    res.status(201).json({ link })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})
// the 'auth' is for the unauthorized users not to enter or have access
router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId })
    res.json(links)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})
// the 'auth' is for the unauthorized users not to enter or have access
router.get('/:id', auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' })
  }
})

module.exports = router