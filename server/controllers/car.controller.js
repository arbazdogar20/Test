const Car = require('../models/Car.models');

const registerCar = async (req,res) => {
    try {
        const addCar = new Car(req.body);
        await addCar.save();
        res.status(201).json(addCar);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

module.exports = {registerCar};