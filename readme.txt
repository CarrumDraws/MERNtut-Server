"npm i nodemon"
"npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose"

body-parser: Process request body from Post, Put, Patch calls
dotenv: Reading .env files
gridsf-stream: file upload
multer multer-gridfs-storage : Simplifies the process of uploading files in Node
helmet: Helps in securing your app by setting various HTTP Headers
morgan: Logs requests and info
mongoose: mongodb access

"npm init y"

Add "type": "module" to package.json. This way we can use import instead of require.

MongoDB Sign-In Data: dummyuser, dummyuser123
Connect to MongoDB with your IPAddress > Select DB > Connect > Connect to your application (Drivers) > Copy connection string + add password > Add to .env as MONGO_URL.
Set PORT to 3001.

Configure Mongoose.

Create a data model for reference. Make these models clear!
With MongoDB, use "subdocs."
Create User Model based off your data model.
Create register() in auth.js that salts and sends a new {User} object to MongoDB.

Make a login route that validates passwords and returns JWT's.

Make a verifyToken middleware function that validates if a correct JWT was passed in.

Make User Routes in users.js(Rotues only logged-in users can access):
    - Grab current User's info
    - Grab User Friends list
    - Add/remove friends

Make all other routes.