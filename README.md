# Formula 1 Data APi
## Overview

This project is an API for querying F1 data - ciruits, constructors, drivers, races and results. The data is returned in Json format 

## Built with

**Node Js** - JS runtime

**Express** - Routing

**Glitch** - For deployment -https://sophisticated-citrine-savory.glitch.me

## API Endpoints

| API Endpoint                                    | Description                                                     | 
|-------------------------------------------------|-----------------------------------------------------------------|
| `/api/circuits`                                 | Get all circuits                                                | 
| `/api/circuits/:id`                             | Get circuit by ID                                               | 
| `/api/constructors`                             | Get all constructors                                            | 
| `/api/constructors/:ref`                        | Get constructor info by reference                               | 
| `/api/constructorResults/:constructorRef/:year` | Get all constructor results for a specified year                | 
| `/api/drivers`                                  | Get all drivers info                                            | 
| `/api/drivers/:ref`                             | Get driver info by reference                                    | 
| `/api/driverResults/:ref/:year`                 | Get all race results over a season for the specified driver     | 
| `/api/races/season/:year`                       | Get info about all the races specified by the year/season       | 
| `/api/races/id/:id`                             | Get info about the race specified by id                         | 
| `/api/results/race/:id`                         | Get all results for the race specified by id                    | 
| `/api/results/season/:year`                     | Get all the race results for every race in the specified season | 



## Test links

- [/api/circuits](https://sophisticated-citrine-savory.glitch.me/api/circuits)
- [/api/circuits/1](https://sophisticated-citrine-savory.glitch.me/api/circuits/1)
- [/api/constructors](https://sophisticated-citrine-savory.glitch.me/api/constructors)
- [/api/constructors/mclaren](https://sophisticated-citrine-savory.glitch.me/api/constructors/mclaren)
- [/api/coNSTrucTors/mclaren](https://sophisticated-citrine-savory.glitch.me/api/coNSTrucTors/mclaren)
- [/api/constructors/javascript](https://sophisticated-citrine-savory.glitch.me/api/constructors/javascript)
- [/api/constructorResults/mclaren/2023](https://sophisticated-citrine-savory.glitch.me/api/constructorResults/mclaren/2023)
- [/api/constructorResults/MERCEDES/2020](https://sophisticated-citrine-savory.glitch.me/api/constructorResults/MERCEDES/2020)
- [/api/constructorResults/mclaren/2040](https://sophisticated-citrine-savory.glitch.me/api/constructorResults/mclaren/2040)
- [/api/constructorResults/comp3612/2023](https://sophisticated-citrine-savory.glitch.me/api/constructorResults/comp3612/2023)
- [/api/drivers](https://sophisticated-citrine-savory.glitch.me/api/drivers)       
- [/api/drivers/hamilton](https://sophisticated-citrine-savory.glitch.me/api/drivers/hamilton)
- [/api/drivers/HAMilton](https://sophisticated-citrine-savory.glitch.me/api/drivers/HAMilton)
- [/api/drivers/randy](https://sophisticated-citrine-savory.glitch.me/api/drivers/randy)
- [/api/driverResults/piastri/2023](https://sophisticated-citrine-savory.glitch.me/api/driverResults/piastri/2023) 
- [/api/driverResults/piastri/2002](https://sophisticated-citrine-savory.glitch.me/api/driverResults/piastri/2002) 
- [/api/races/season/2023](https://sophisticated-citrine-savory.glitch.me/api/races/season/2023)
- [/api/races/seasoning/2023](https://sophisticated-citrine-savory.glitch.me/api/races/seasoning/2023)
- [/api/races/season/2032](https://sophisticated-citrine-savory.glitch.me/api/races/season/2032)
- [/api/results/race/1100](https://sophisticated-citrine-savory.glitch.me/api/results/race/1100)
- [/api/results/race/1756348576](https://sophisticated-citrine-savory.glitch.me/api/results/race/1756348576)
- [/api/results/season/2023](https://sophisticated-citrine-savory.glitch.me/api/results/season/2023)
- [/api/results/season/2034](https://sophisticated-citrine-savory.glitch.me/api/results/season/2034)




