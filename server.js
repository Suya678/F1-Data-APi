const express = require('express');
const app = express();
const fs = require("fs");
const PORT = 3000;

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


/**
 * * Sends a response back with an error message indicating that the provided number is invalid.
 *
 * @param res  The response object
 * @param number THe invalid number or value which will be embedded in the request
 */
function sendInvalidNumber(res, number) {
    res.status(400).json({
        error: "Invalid request",
        message: `${number}' is not a valid number`});
}

/**
 * * Sends a response back with an error message indicating that the requested resource does not exist
 *
 * @param res  The response object
 * @param param THe resource that was requested
 */
function sendNoResultsFound(res, param) {
    res.status(400).json({
        error: "Invalid request",
        message: `No results found for ${param}`});
}



/**
 * Validates that the param is a number. If it is - returns the number as int ant other returns -1
 *
 * @param param The value being checked
 * @returns -1 if the param is not an int, or it's int representation otherwise
 */function validateParamIsaNumber(param) {
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

    const circuit = circuits.find(c => c.circuitId === id);
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

    if(year === -1){
        return sendInvalidNumber(res, req.params.year);
    } else if(!constructor ) {
        return sendNoResultsFound(res, `constructorRef: ${req.params.constructorRef}`);
    }
    const yearResultForConstructor = results.filter((result)=> {
        return result.constructor.ref === constructor.constructorRef && result.race.year === year;
    });

    if(yearResultForConstructor.length === 0) {
        sendNoResultsFound(res, `constructorRef: ${ req.params.constructorRef} for driverRef: ${req.params.year}`);
    } else {
    res.json(yearResultForConstructor);

    }
});

// GET all drivers
app.get('/api/drivers', (req, res) => {
    res.json(drivers);
});

// GET single driver by driverRef
app.get('/api/drivers/:ref', (req, res) => {
    const driver = drivers.find(c => c.driverRef === req.params.ref);
    !driver ? sendNoResultsFound(res, `driverRef: ${req.params.ref}`) : res.json(driver);
});


// GET race results for a driver for a specific season
app.get('/api/driverResults/:driverRef/:year', (req, res) => {
    const year = validateParamIsaNumber(req.params.year);
    const driver = drivers.find(c => c.driverRef === req.params.driverRef);

    if(year === -1){
        return sendInvalidNumber(res, req.params.year);
    } else if(!driver ) {
        return sendNoResultsFound(res, `driverRef: ${req.params.driverRef}`);
    }

    const yearResultForDriver = results.filter((result)=> {
        return result.driver.ref === driver.driverRef && result.race.year === year;
    });

    if(yearResultForDriver.length === 0) {
        sendNoResultsFound(res, `driverRef: ${ req.params.driverRef} and  year: ${req.params.year}`);
    } else {
        res.json(yearResultForDriver);
    }

});

// GET all races for a specific season
app.get('/api/races/season/:year', (req, res) => {
    const year = validateParamIsaNumber(req.params.year);
    if(year === -1) {
        return sendInvalidNumber(res, req.params.year);
    }

    const yearResults = races.filter((race)=> {
        return race.year === year;
    });

    res.json(yearResults);
});

// GET a single race by raceId
app.get('/api/races/id/:id', (req, res) => {
    const id = validateParamIsaNumber(req.params.id);
    if(id === -1){
        return sendInvalidNumber(res, req.params.id);
    }

    const race = races.find(race => race.id === id);
    if (!race) {
        sendNoResultsFound(res, `id: ${req.params.id}`);
    } else {
        res.json(race);
    }

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

    if (year === -1) {
        return sendInvalidNumber(res, req.params.year);
    }

    const allRaceResultsForTheYear = results.filter((result) => result.race.year === year);

    if (allRaceResultsForTheYear.length === 0) {
        sendNoResultsFound(res, `year: '${req.params.year}'`);
    } else {
        res.json(allRaceResultsForTheYear);
    }

});


// TO handle any non-existing endpoints
app.use((req,res) => {
    res.status(404).json({error: 'Endpoint does not exist'});
});