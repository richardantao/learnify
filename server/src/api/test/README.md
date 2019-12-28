# Test

Files in this `/test` folder are for integration testing. Unit test files are held in the respective folder of the module they are testing.

The purpose of the integration tests are to verify whether a given URL in the app correctly passes the proper data through the route chain. 

Routes inside the application all require user authentication to access, POST and PUT requests require form validation, and all routes execute one of the four CRUD operations, so the business logic needs to be verified. 

Routes that successfully execute these 1-3 modules can be marked as ready for `staging`.