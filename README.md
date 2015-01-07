Proffsbyggen
--------------
School Project
-Commensts in swedish

Getting Started
---------------
Need npm and node installed

```bash
cd proffsbyggen

npm install
npm install bower -g
bower install

node app.js
```

Technology
----------
| On The Server     | On The Client  | Development | 
| -------------     | -------------- | ----------- |
| Node/NPM          | Foundation     | Bower       |
| Express           | Font-Awesome   |             |
| Swig              | jQuery         |             |
| Mongoose          |                |             |
| Body-parser       |                |             |
| Cookie-parser     |                |             |
| Compression       |                |             |
| Helmet            |                |             |
| Connect-mongo     |                |             |
| express-validator |                |             |
| express-flash     |                |             |
| Errorhandler      |                |             |
| Express-session   |                |             |
| Method-override   |                |             |
| Moment            |                |             |
| Mmorgan           |                |             |
| Express-session   |                |             |
| passport          |                |             |

Project Structure
-----------------
```bash
.bowerrc
.gitignore
.travis.yml
app.js
bower.js
package.json
public
    css
        index.css
        main.css
        responsiv-tables.css
    js
        admin.js
        anstalld.js
        anvandare.js
        jquery-1.11.1.min.js
        projekt.js
        responsive-tables.js
        visaproject.js
    views
        admin.html
        anstalld.html
        anvandare.html
        flash.html
        head.html
        index.html
        kundform.html
        navbar.html
        nyanvandare.html
        nyttlosenord.html
        projekt.html
        robots.txt
        visaproject.html
README.md
server
    config
        config.js
        passport.js
        secrets.js
    controllers
        home.js
        project.js
        user.js
    models
        Project.js
        User.js
```        