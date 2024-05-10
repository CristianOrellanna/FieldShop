
# FieldShop
Web project named "FieldShop", with login, user profiles and third normal form relational SQL.


## Link app
:globe_with_meridians: fieldshop.onrender.com


## Tech Stack

**Client:** Ejs templates, Bootstrap5, CSS

**Server:** Node, Express

**Database:** MySql


## Installation

Module installation

```bash
  npm init
```

Installation of dependencies

Specifications=> "express-session" or "cookie-session" for user session management, "mysql2" for database connection,
"ejs" for templates, "dotenv" for environment variables, and finally "bcryptjs" for password hashing.
```bash
  npm i express cookie-session mysql2 ejs dotenv
```

Installation of Dev dependencies(Testing)

Jest: as a testing framework,</br>
Supertest: as a module that will allow making requests to the backend,</br>
*(-D means it is a development dependency):
```bash
  npm i -D jest supertest
```
    
## Running Tests

To run tests, run the following command

```bash
  npm run test
```


## Screenshots

![App Screenshot](https://i.ibb.co/VN7s49g/Screenshot-2024-05-09-160933.png)


## Documentation

```
└── 📁FieldShop
    └── .gitignore
    └── app.js
    └── config.js
    └── 📁database
        └── bd_fieldshop.sql
        └── db.js
    └── 📁env
        └── .env
    └── package-lock.json
    └── package.json
    └── 📁public
        └── 📁css
            └── style.css
    └── README.md
    └── 📁tests
        └── getPages.spec.js
        └── postPages.spec.js
    └── 📁views
        └── contact.ejs
        └── index.ejs
        └── login.ejs
        └── products.ejs
        └── register.ejs
        └── us.ejs
```


