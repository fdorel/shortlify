const {Router} = require('express');
const Link = require('../models/Link');
const router = Router();

router.get('/:code', async (req, res) => {
  try {
    // with the Object 'params' we are recieving the '/:code' from above
    const link = await Link.findOne({ code: req.params.code });

    if (link) {
      // we start here by counting the number of clicks
      link.clicks++;
      // we save it
      await link.save();

      return res.redirect(link.from);
    }
    res.status(404).json('Link not found');

  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again' });
  }
})


module.exports = router;