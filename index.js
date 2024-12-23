require("dotenv").config()
const path = require("path")
const express = require("express");
const { database, getLocation } = require('./database')
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const morgan = require("morgan")
const fs = require("fs");
const { ppid } = require("process");


const app = express()
// const app_port = process.env.PORT
const app_port = 5555
app.set('view engine', 'ejs');
morgan("dev")

app.use(cors({ origin: '*', allowedHeaders: 'Content-Type, Authorization' }))
app.use(express.json())
app.use(express.static('public'))

// Configure multer storage
const uploadDir = 'public/uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/'); // Upload directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});
const upload = multer({ storage });

app.get('/', (req, res) => res.render('home'))

app.get('/downloads', function (req, res) {
  const files = fs.readdirSync(path.join(__dirname, 'public/uploads/'))
  let result = []
  files.forEach(function (file) {
    if (!file.includes('.DS_Store', '..')) {
      result.push({ path: '/uploads/' + file, name: file.toString() })
    }
  })
  res.render('downloads', { files: result })
})

app.get('/upload', (req, res) => {
  res.render('upload');
})
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  res.send('File uploaded successfully: ' + req.file.filename);
});

app.get('/path-to-download', function (req, res) {
  const { location } = req.body;
  var str = getLocation(location)

  const _homedir = path.resolve(__filename).split("Sites")[0]
  res.send(_homedir + `${str}/`)
})

app.use('*', function (req, res) {
  res.status(404);
  const error = { message: 'This is a default route' };
  if (req.accepts('html')) {
    res.render('404', { error })
  } else if (req.accepts('json')) {
    res.json(error)
  } else res.type('text').send(error.message)

})

app.listen(app_port, '0.0.0.0', function () {
  console.log("FTS-Server Listening on port: ", app_port);
  console.log("To test live server vist:", `http://localhost:${app_port}`);
})