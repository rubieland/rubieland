# Rubieland

## Before we begin...

### Set up the backend

1. **Install the dependencies**

   ```bash
   cd .\backend\
   ```

   ```bash
   npm i
   ```

   or

   ```bash
   npm install
   ```

   <br>

2. **Add your environment variables**

   Create a .env file at the root of **/backend** folder

   💡 You will find in **/backend/.env.sample** all the env variables you need to create. Or, refer to the list below:

   ```pl
   APP_HOST # localhost
   APP_PORT # 9000
   CLIENT_HOST # localhost
   CLIENT_PORT # 5173
   DEV_DB_URI # development mongodb uri
   PROD_DB_URI # production mongodb uri
   NODE_ENV # development or production
   JWT_SECRET # the secret key for the jwt.sign
   JWT_EXPIRATION # time before expiration of the token. format: "1s" for 1 second, "1m" for 1 minute, "1h" for 1 hour, "1d" for 1 day
   SESSION_SECRET # the secret key for the session (for authentication)
   COOKIE_MAX_AGE # time in milliseconds before expiration of the cookie stored in session. e.g.: "3600000" = 1 hour (3.600.000 milliseconds)
   ```

<br>

3. **(Optional) You can add a set of data in database using a script**

   You will find at the root of **/backend** folder a file named **addDataToDatabase.ts** which is a script that, as its name suggests, adds a set of data in database.

   This way, after running this script, everything will be set up and ready for you to test anything it pleases you!

    <br>

   **Run the script**

   If you don't have the package **tsx** installed, you can install it globally by running

   ```bash
   npm install -g tsx
   ```

   then go to **/backend** folder

   ```bash
   cd .\backend\
   ```

   and finally, run the script

   ```bash
   tsx .\addDataToDatabase.ts
   ```

    <br>

   ***

   ### User credentials

   💡You will find users credentials to login in **/backend/data/users.json** or in the table below :

   | Email               | Password   | Role  |
   | ------------------- | ---------- | ----- |
   | admin@admin.com     | Admin44!   | admin |
   | johndoe@johndoe.com | Johndoe44! | user  |

    <br>

   ***

   ### Avatars and pictures

   💡You will find in **/backend/src/uploads/mock** a copy of the pictures used for the data in **/data/{foo}.json** if needed.

    <br>

   ***

### Run the backend server

Once the dependencies are installed, the env variables are set, and data are inserted in base (optional), you can start running the server!

💡Make sure you are in **/backend** and run

```bash
npm run dev
```

If everything is fine, you should see these messages in console :

- i18next initialized successfully!
- Connection to database successful!
- Server is running on <strong><u>http://{APP_HOSTNAME}:{APP_PORT}</u></strong>

If so, that means that the server is working fine. You can now set up the frontend app and you'll be ready to go!
