const Partner = require('../database/models/partnerModel');

const getAllPartners = async () => {
    try {
        return await Partner.find();
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    getAllPartners,
};
