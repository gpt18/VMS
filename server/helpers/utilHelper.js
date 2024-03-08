const NGO = require("../models/ngo.model");
const VOLUNTEER = require('../models/volunteer.model');
const { nanoid  } = require('nanoid');

const generateVerificationToken = (length = 10) => {
    return nanoid(length);
}

async function getNgoID () {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);

    try{
        const count = await NGO.countDocuments({});
        return `${year}NGO00${count+1}`;
    }catch(err){
        console.log(err);
        return null;
    }

}

async function getVolID () {
    const date  = new Date();
    const year = date.getFullYear().toString().slice(-2);

    try {
        const count = await VOLUNTEER.countDocuments({});
        return `${year}VOL00${count+1}`;
    } catch (error) {
        console.log(err);
        return null;
    }

}

module.exports = {
    getNgoID,
    getVolID,
    generateVerificationToken,
}