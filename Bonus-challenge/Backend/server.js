const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const mongoSanitize = require('express-mongo-sanitize');

const app = express();
const port = process.env.PORT || 5000;


app.use(mongoSanitize());
app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended:false, limit: "50mb", parameterLimit: 500000000 }));

const uri = process.env.ATLAS_URI;
 
mongoose.connect(uri, { useNewUrlParser: true }
)
const db = mongoose.connection;
db.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const onboardingRouter = require('./Routes/onboarding.route');

app.use('/api/signup/', onboardingRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});