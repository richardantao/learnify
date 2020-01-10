# Learnify
Building the Foundations for Student Success.

## Application Structure

### Config

### Controllers


### Middleware
Folder contains middleware for `rendering` (SSR), `storage`, and `validation`.

### Migrations

### Models
`models` contained the generated schema for the API's data

### Routes
`routes` connect the `middleware` and `controllers` of the API to the server. Public routes call any necessary storage/middleware before the respective controller. Private routes contain the same sequence as public routes except their are initialized are auth validation.

### Test
Integration test files are contained here. Unit tests are held beside the file they represent.

### Util
Any helper functions are defined heres.

### Views
`views` contains the client-side React/Redux app.

## Scripts
Learnify uses `concurrently` to run parallel scripts.

`npm run build` - create an optimized bundle of the server.

`npm run client` - starts up the client server.

`npm run coverage` - 

`npm run deploy` - Deploys the service to Google Cloud Platform.

`npm run dev` - Starts up the client and server simultaneously.

`npm run prepare` - Creates optimized build folders for the client and server.

`npm run stage` - Runs the build servers for the frontend and backend.

`npm start` - Starts up the server (without nodemon).

`npm run server` - Starts up the server (with nodemon).

`npm test` - Initiates the mocha testing suite.

