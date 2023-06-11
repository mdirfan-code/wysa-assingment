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

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // Or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
        if (net.family === familyV4Value && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }
            results[name].push(net.address);
        }
    }
}
console.log(results)