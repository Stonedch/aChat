const { Router } = require('express')
const router = Router()
const ip = require('ip')
let User = require('../models/user')

router.get('/', async (req, res) => {
  res.send('search')
  const search = [];
  const userId = ip.address().toString();
  const user = await User.find({ "myself.userId": userId })
  const companions = await User.find({ "myself.connection": false, "myself.warnings.banned": false });
  const userItems = user[0];

  async function searching(u, c) {
    if (
      u.companion.gender == c.myself.gender &&
      u.companion.year == c.myself.year &&
      c.companion.gender == u.myself.gender &&
      c.companion.year == u.myself.year) {

      const Id = c.myself.userId;
      search.push(Id);
    }
  }

  await Promise.all(companions.map(async companion => {
    if (userItems.companion.themes == companion.companion.themes) {
      searching(userItems, companion);
    }
  }))

  const companionId = search[0];
  const companion = await User.find({ "myself.userId": companionId});
  
  
  
  

})




module.exports = router