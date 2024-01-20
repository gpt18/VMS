const NGO = require("../models/ngo.model");

async function getNgoID () {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);

    try{
        const count = await NGO.countDocuments({});
        return `N${year}00${count+1}`;
    }catch(err){
        console.log(err);
        return null;
    }

}

module.exports = {
    getNgoID,
}