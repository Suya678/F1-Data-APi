const express = require('express');
const app = express();
const fs = require("fs");
const PORT = 30000;

let circuits;
let constructors;
let drivers;
let results;
let races;

try {
    circuits = JSON.parse(fs.readFileSync('./data/circuits.json', 'utf8'));
    constructors = JSON.parse(fs.readFileSync('./data/constructors.json', 'utf8'));
    drivers = JSON.parse(fs.readFileSync('./data/drivers.json', 'utf8'));
    results = JSON.parse(fs.readFileSync('./data/results.json', 'utf8'));
    races = JSON.parse(fs.readFileSync('./data/races.json', 'utf8'));
}catch(err) {
    console.error("Json Files could not be loaded " + err);
    process.exit(1);
}

// Validates that param is a number. Returns a number representation of param otherwise returns -1.
function validateParamIsaNumber(param) {
    const num = parseInt(param);
    return isNaN(num) ? -1 : num;
}
app.listen(
    PORT,
    ()=> console.log(`Server started on port http://localhost:${PORT}`)
);


// GET all circuits
app.get('/api/circuits', (req, res) => {
    res.json(circuits);
});

// GET single circuit by circuitId
app.get('/api/circuits/:id', (req, res) => {

    const id = validateParamIsaNumber(req.params.id);
    if(id === -1){
        return sendInvalidNumber(res, req.params.id);
    }

    const circuit = circuits.find(c => {
        return c.circuitId === req.params.id;
    });
    !circuit ? sendNoResultsFound(res, `id: ${req.params.id}`) :res.json(circuit);

});

// GET all constructors
app.get('/api/constructors', (req, res) => {
    res.json(constructors);
});

// GET single constructor by constructorRef
app.get('/api/constructors/:ref', (req, res) => {
    const constructor = constructors.find(c => c.constructorRef === req.params.ref);
    !constructor ? sendNoResultsFound(res, `ref: ${req.params.ref}`) : res.json(constructor);
});

// GET race results for a constructor for a specific season
app.get('/api/constructorResults/:constructorRef/:year', (req, res) => {
    const year = validateParamIsaNumber(req.params.year);
    const constructor = constructors.find(c => c.constructorRef === req.params.constructorRef);
    console.log(constructor);

    if(year === -1 || !constructor ) {
        res.sendStatus(404);
        return;
    }
    const yearResultForConstructor = results.filter((result)=> {
        return result.constructor.ref === constructor.constructorRef && result.race.year === year;
    });

   res.json(yearResultForConstructor);
});

// GET all drivers
app.get('/api/drivers', (req, res) => {
    res.json(drivers);

});

// GET single driver by driverRef
app.get('/api/drivers/:ref', (req, res) => {
    const driver = drivers.find(c => {
        return c.driverRef === req.params.ref;
    });
    !driver ? res.sendStatus(404) : res.json(driver);
});



// GET race results for a driver for a specific season
app.get('/api/driverResults/:driverRef/:year', (req, res) => {
    const year = validateParamIsaNumber(req.params.year);
    const driver = drivers.find(c => c.driverRef === req.params.driverRef);

    if(year === -1 || !driver ) {
        res.sendStatus(404);
        return;
    }

    const yearResultForDriver = results.filter((result)=> {
        return result.driver.ref === driver.driverRef && result.race.year === year;
    });

    res.json(yearResultForDriver);
});

// GET all races for a specific season
app.get('/api/races/season/:year', (req, res) => {
    const year = validateParamIsaNumber(req.params.year);

    if(year === -1) {
        res.sendStatus(404);
        return;
    }

    const yearResults = results.filter((result)=> {
        return result.race.year === year;
    });

    res.json(yearResults);
});

// GET a single race by raceId
app.get('/api/races/id/:id', (req, res) => {
    const id = validateParamIsaNumber(req.params.id);
    if(id === -1){
        return sendInvalidNumber(res, req.params.id);
    }

    const race = results.find(c => c.race.id === id);
    console.log(race);
    !race ? res.sendStatus(404) : res.json(race);

});

// GET all results for a specific race
app.get('/api/results/race/:id', (req, res) => {
    const id = validateParamIsaNumber(req.params.id);
    if(id === -1){
        return sendInvalidNumber(res, req.params.id);
    }
    const allRaceResults = results.filter((result)=> {
        return result.race.id === id;
    });

    if(allRaceResults.length === 0){
        sendNoResultsFound(res, `race: '${req.params.year}'`);
    } else {
        res.json(allRaceResults);
    }
});

// GET all results for a specific season
app.get('/api/results/season/:year', (req, res) => {
    const year = validateParamIsaNumber(req.params.year);

    if(year === -1){
        return sendInvalidNumber(res, req.params.year);
    }

    const allRaceResultsForTheYear = results.filter((result)=> result.race.year === year);

    if(allRaceResultsForTheYear.length === 0){
        sendNoResultsFound(res, `year: '${req.params.year}'`);
    } else {
        res.json(allRaceResultsForTheYear);
    }

});

function sendInvalidNumber(res, number) {
    res.status(400).json({
        error: "Invalid request",
        message: `Year parameter '${number}' is not a valid number`});
}

function sendNoResultsFound(res, param) {
    res.status(400).json({
        error: "Invalid request",
        message: `No results found for ${param}`});
}
