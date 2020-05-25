const {Router} = require('express');
const mongoose = require('mongoose');
const ip = require('ip');
let User = require('../models/user');



const router = Router();


router.get('/', (req, res) => {
    res.send('hello');
    
})

router.post('/add', async (req,res) => { 
    console.log(req.body);
    
    const description = req.body.myself.description;
    const genderMine = req.body.myself.gender;
    const yearMine = req.body.myself.year;
    const userId =  ip.address();
    const themes = req.body.companion.themes;
    const genderFind = req.body.companion.gender || '?';
    const yearFind = req.body.companion.year;
    const newUser = new User({
        myself: {
            description,
            gender: genderMine,
            year: yearMine,
            userId,
            connection: false,
            warnings: {
                count: 0,
                banned:false,
                bannedTimer: ''
            }
        }, 
        companion: {
            themes,
            gender: genderFind,
            year: yearFind  
        }
    });

    try {
        await newUser.save();
        console.log('user add')
        res.redirect('/search')
    } catch (e) {
        console.log(e);
        
    }

    try {
        
    } catch (e) {
        console.log(e);
        
    }
})



module.exports = router