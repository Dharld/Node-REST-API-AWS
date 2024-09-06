const Partner = require('./models/partnerModel');

const getAllPartners = () => {
    return Partner.find();
};

module.exports = {
    getAllPartners,
};
