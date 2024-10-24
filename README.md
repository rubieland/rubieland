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
   PORT # e.g. 9000
   CLIENT_URL # http://localhost:5173
   DB_URI # mongodb uri
   NODE_ENV # development or production
   UPLOADS_DIR # the directory where the uploads will be stored
   JWT_SECRET # the secret key for the jwt.sign
   JWT_REFRESH_SECRET # the secret key for the jwt.sign for the refresh token
   ACCESS_TOKEN_EXPIRATION # expiration of the access token
   REFRESH_TOKEN_EXPIRATION # expiration of the refresh token
   COOKIE_MAX_AGE # time in milliseconds before expiration of the cookie. e.g.: "3600000" = 1 hour (3.600.000 milliseconds)
   EMAIL_USER # your gmail address => needed for nodemailer, to receive messages coming from the contact form
   EMAIL_APP_PASSWORD # app password that you can create for the app using this link: https://myaccount.google.com/apppasswords. It is also needed for nodemailer authentication
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

   💡You will find in **/backend/uploads/mock** a copy of the pictures used for the data in **/data/{foo}.json** if needed.

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
- Server is running on port {PORT}</u></strong>

If so, that means that the server is working fine. You can now set up the frontend app and you'll be ready to go!

<hr>

### Set up the frontend

1. **Install the dependencies**

   ```bash
   cd .\frontend\
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

   Create a .env file at the root of **/frontend** folder

   💡 You will find in **/backend/.env.sample** all the env variables you need to create. Or, refer to the list below:

   ```pl
    VITE_API_URL # your backend url
    VITE_API_BLOG_PICTURES_PATH # path to the blog pictures folder
    VITE_API_USERS_AVATARS_PATH # path to the user avatars folder
   ```

### Run the frontend app

Once the dependencies are installed and the env variables are set, you can start running the app!

💡Make sure you are in **/frontend** and run

```bash
npm run dev
```

And now, everything is ready for you to start using **Rubieland!**
