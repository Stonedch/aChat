const { Router } = require('express')
const router = Router()
const ip = require('ip')
const key = require('../middleware/random')
let User = require('../models/user')

router.get('/', async (req, res) => {
  const search = [];
  const userId = ip.address().toString();
  const user = await User.find({ "myself.userId": userId })
  const userItems = user[0];
  const companions = await User.find({ "myself.connection": false, "myself.warnings.banned": false });


  await Promise.all(companions.map(async companion => {
    if (userItems.companion.themes == companion.companion.themes) {
      await searching(userItems, companion);
    }
  }))

  async function searching(u, c) {
    if (
      u.companion.gender == c.myself.gender &&
      u.companion.year == c.myself.year &&
      c.companion.gender == u.myself.gender &&
      c.companion.year == u.myself.year) {

      const Id = c.myself.userId;
      search.push(Id);
      const companionId = search[0];
      const companion = await User.find({ "myself.userId": companionId });
      const companionItems = companion[0];
      await sendKey(userItems, companionItems);
    }
  }


  async function sendKey(user, companion) {
    try {
      const ioKey = key.createId();
      const c = companion.myself
      const u = user.myself;
      c.ioKey = u.ioKey = ioKey;
      c.connection = u.connection = false;

      await companion.save();
      await user.save();
      console.log('add key');
      res.redirect('/chat')
    } catch (e) {
      console.log(e);

    }
  }
  

})

module.exports = { router }
