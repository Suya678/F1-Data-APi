# Formula 1 Data APi
## Overview

This project is an API for querying F1 data - ciruits, constructors, drivers, races and results. The data is returned in Json format 

## Built with

**Node Js** - JS runtime

**Express** - Routing
**[Glitch](https://cyan-traveling-icon.glitch.me/api/)** - For deployment

## API Endpoints

| API Endpoint                                    | Description                                                     | Example                                                                                                           |
|-------------------------------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `/api/circuits`                                 | Get all circuits                                                | [/api/circuits](https://cyan-traveling-icon.glitch.me/api/circuits)                                               |
| `/api/circuits/:id`                             | Get circuit by ID                                               | [/api/circuits/1](https://cyan-traveling-icon.glitch.me/api/circuits/1)                                           |
| `/api/constructors`                             | Get all constructors                                            | [/api/constructors](https://cyan-traveling-icon.glitch.me/api/constructors)                                       |
| `/api/constructors/:ref`                        | Get constructor info by reference                               | [/api/constructors/ferrari](https://cyan-traveling-icon.glitch.me/api/constructors/ferrari)                       |
| `/api/constructorResults/:constructorRef/:year` | Get all constructor results for a specified year                | [/api/constructorResults/ferrari/2020](https://cyan-traveling-icon.glitch.me/api/constructorResults/ferrari/2020) |
| `/api/drivers`                                  | Get all drivers info                                            | [/api/drivers](https://cyan-traveling-icon.glitch.me/api/drivers)                                                 |
| `/api/drivers/:ref`                             | Get driver info by reference                                    | [/api/drivers/hamilton](https://cyan-traveling-icon.glitch.me/api/drivers/hamilton)                               |
| `/api/driverResults/:ref/:year`                 | Get all race results over a season for the specified driver     | [/api/driverResults/hamilton/2023](https://cyan-traveling-icon.glitch.me/api/driverResults/hamilton/2023)         |
| `/api/races/season/:year`                       | Get info about all the races specified by the year/season       | [/api/races/season/2023](https://cyan-traveling-icon.glitch.me/api/races/season/2023)                             |
| `/api/races/id/:id`                             | Get info about the race specified by id                         | [/api/races/id/1100](https://cyan-traveling-icon.glitch.me/api/races/id/1100)                                     |
| `/api/results/race/:id`                         | Get all results for the race specified by id                    | [/api/results/race/1100](https://cyan-traveling-icon.glitch.me/api/results/race/1100)                             |
| `/api/results/season/:year`                     | Get all the race results for every race in the specified season | [/api/results/season/2023](https://cyan-traveling-icon.glitch.me/api/results/season/2023)                         |


## Invalid Endpoint Examples
- [/api/circuits/random](https://cyan-traveling-icon.glitch.me/api/circuits/random)
- [/api/constructorResults/Randy](https://cyan-traveling-icon.glitch.me/api/constructorResults/Randy)
- [/api/drivers/randy](https://cyan-traveling-icon.glitch.me/api/drivers/randy)
- [/api/races/seasoning/2023](https://cyan-traveling-icon.glitch.me/api/races/seasoning/2023)
- [/api/results/race/1756348576](https://cyan-traveling-icon.glitch.me/api/results/race/1756348576)
- [/api/results/season/20](https://cyan-traveling-icon.glitch.me/api/results/season/20)