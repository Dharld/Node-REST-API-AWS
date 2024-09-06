const Partner = require('../database/models/partnerModel');

const getAllPartners = async (req, res) => {
    try {
        const partners = await Partner.find();
        res.status(200).json(partners);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    getAllPartners,
};
