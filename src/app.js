const routes = require('./routes/index')
const path = require("path")
const express = require('express')
const app = express();
const cors = require('cors');
const methodOverride = require('method-override');


app.use(cors())
app.use(express.json())
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve("public")))
app.use(routes)

app.listen(3000, () => {
  console.log('Servidor Rodando!');
})