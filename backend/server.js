const express = require('express') //express framework
const cors = require('cors') //enable cors
const mongoose = require('mongoose') //mongodb
require('dotenv').config({path: __dirname + '/.env'}); //dotenv config
const app = express() //init app function

// Imports the Google Cloud client library
const {Translate} = require('@google-cloud/translate').v2;

// Creates a client
const translate = new Translate();

const server = require('http').createServer(app) //supply to http server
const io = require('socket.io')(server)

const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection success")
})

const userRouter = require('./routes/users')
app.use('/user', userRouter)
const users = {};

server.listen(port, () => {
  console.log('Server running on port ', port)
})

/**
 * TODO(developer): Uncomment the following lines before running the sample.
 */
// const text = 'The text to translate, e.g. Hello, world!';
// const target = 'The target language, e.g. ru';

async function translateText() {
  // Translates the text into the target language. "text" can be a string for
  // translating a single piece of text, or an array of strings for translating
  // multiple texts.
  let [translations] = await translate.translate("I ate dog food", 'Chinese');
  translations = Array.isArray(translations) ? translations : [translations];
  console.log('Translations:');
  translations.forEach((translation, i) => {
    console.log(`${text[i]} => (${target}) ${translation}`);
  });
}

translateText();