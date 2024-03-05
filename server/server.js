const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const routes = require('./routes/ArticleRoutes')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors());

const uri = process.env.MONGO_URI

mongoose.connect(uri)
.then(() => console.log("Database Connected"))
    .catch((err) => console.log("Database not connected", err))


app.use('/api',routes);

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Server is running on port ${port}`))