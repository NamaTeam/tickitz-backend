## Tickitz-Server

This is a ExpressJs-based API for [frontend project](https://github.com/NamaTeam/tickitz-frontend-2). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/NamaTeam/tickitz-backend.git`
* `cd tickitz-backend`
* `npm` install to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node index.js` to start the local server

## DB Structure

Open [schema](https://drawsql.app/dea/diagrams/tickitz)

## Folder Structure

    ├── controllers                    
    │   ├── Auth.js              
    │   ├── Cinemas.js              
    │   ├── Movies.js             
    │   ├── Order.js
    |   ├── Schedule.js
    |   ├── Seat.js
    |   └── User.js
    ├── helpers
    │   ├── connect_db.js
    │   ├── fromResponse.js              
    │   ├── fromUpload.js             
    │   ├── queryAuth.js
    |   ├── queryCinemas.js
    |   ├── queryMovies.js
    |   ├── queryOrder.js
    |   ├── querySchedule.js
    |   ├── queryUser.js
    |   └── verifyToken.js
    ├── models
    │   ├── Auth.js
    │   ├── Cinemas.js
    │   ├── Movies.js
    │   ├── Order.js
    |   ├── Schedule.js
    |   ├── Seat.js
    |   └── User.js
    ├── routes
    │   ├── Auth.js              
    │   ├── Cinemas.js    
    │   ├── index.js
    │   ├── Movies.js             
    │   ├── Order.js
    |   ├── Schedule.js
    |   ├── Seat.js
    |   └── User.js
    └── index.js
    
## Endpoints
movie endpoint

    GET      /movies
    GET      /movies/date?start=2021-05-06
    GET      /movies/month?month=05
    GET      /movies/upcoming
    GET      /movies/1
    POST     /movies
    PATCH    /movies/1
    DEL      /movies/1

cinema endpoint

    GET      /cinemas
    GET      /cinemas/all
    POST     /cinemas/list/4
    POST     /cinemas
    PATCH    /cinemas/1
    DEL      /cinemas/1

when put under a domain with `PREFIX_URI`, it would look like:

    https://www.example.com/tickitz/api/users
 
