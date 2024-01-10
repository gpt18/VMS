const express = require('express')
const router = express.Router()
const Volunteer = require('../models/volunteer')
const mongoose = require('mongoose')
const volunteer = require('../models/volunteer')

router.get('/re', async (req, res) => {
    res.render('home')
})

// getting all
router.get('/', async (req, res) => {
    try {
        const volunteers = await Volunteer.find()
        res.json(volunteers)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// getting one
router.get('/:id', getVolunteer, (req, res) => {
    res.json(res.vol)
})

// creating one
router.post('/', async (req, res) => {
    const volunteer = new Volunteer({
        name: req.body.name,
        joinedNgo: req.body.joinedNgo
    })

    try {
        const newVolunteer = await volunteer.save()
        res.status(201).json(newVolunteer)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// updating one
router.patch('/:id', getVolunteer, async (req, res) => {
    if(req.body.name != null){
        res.vol.name = req.body.name
    }
    if(req.body.joinedNgo != null){
        res.vol.joinedNgo = req.body.joinedNgo
    }

    try {
        const updatedVolunteer = await res.vol.save()
        res.json(updatedVolunteer)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

// deleting one
router.delete('/:id', getVolunteer, async (req, res) => {
    try {
        await volunteer.findByIdAndDelete(req.params.id)
        res.json({ message: 'Volunteer Deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})



async function getVolunteer(req, res, next) {
    let vol;
    try {

        // check if the id parameter is valid 
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) { 
            return res.status(400).json({ message: 'Invalid id' }); 
        }

        // check if a document with the given id exists 
        const exists = await Volunteer.exists({ _id: req.params.id }); if (!exists) { 
            return res.status(404).json({ message: 'Cannot find volunteer' }); 
        }

        // find the document and assign it to the vol variable
        vol = await Volunteer.findById(req.params.id);

    } catch (error) { 
        return res.status(500).json({ message: error.message }); 
    }

    res.vol = vol; 
    next();
}

module.exports = router