const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require('express-rate-limit'); 

const app = express();

const db = monk(process.env.MONGO_URI || 'localhost/tweets');
const tweets = db.get('tweets');


app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
    console.log('hello there');
    response.json({
        message: 'hey bich'
    });
});

app.get('/aidan', (request, response) => {
    response.json({
        message: 'This route is working???'
    });
})

app.get('/tweets', (request, response) => {
    console.log(tweets.find());
    tweets
        .find()
        .then(tweets => {
            response.json(tweets);
        });
});

function  isValidTweet(tweet){
    return tweet.name && tweet.name.toString().trim() != '' && 
           tweet.content && tweet.content.toString().trim() != '';
}

app.use(rateLimit({
    windowMs: 5 * 1000,
    max: 1
})); 

app.post('/tweets', (request, response) => {
    if(isValidTweet(request.body)){
        const tweet = {
            name: request.body.name.toString(),
            content: request.body.content.toString(),
            created: new Date()
        }

        tweets.insert(tweet).then(createdTweet => {
            response.json(createdTweet); 
        });
    } else {
        response.status(422);
        response.json({
            message: 'name and content are required idiot. '
        })
    }
});



app.listen(5000, () => {
    console.log("listening on http://localhost:5000 ")
});