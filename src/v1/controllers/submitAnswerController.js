const submitAnswer = (req, res) => {
    const {countries} = req.body;

    if (!countries || !Array.isArray(countries)) {
        return res.status(400).json({error: 'Invalid input: countries must be an array'});
    }

    for (const country of countries) {
        if (
            !country.name ||
            !country.startDate ||
            !country.attendeeCount ||
            !Array.isArray(country.attendees) ||
            country.attendees.length !== country.attendeeCount
        ) {
            return res.status(400).json({
                error: 'Invalid input: each country must have a name, startDate, attendeeCount, and attendees array matching the attendeeCount',
            });
        }
    }

    // Assuming we have a function to save the data to the database
    // saveCountries(countries);

    return res.status(200).json({message: 'Countries submitted successfully', data: countries});
};

module.exports = {
    submitAnswer,
};
