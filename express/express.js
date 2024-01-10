const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

const accountSid = 'ACfef88ae0600c9adc53dd68c35a2cda54';
const authToken = 'dc0ca8348d3e26f90c936bd68fb00be5'; 
const client = require('twilio')(accountSid, authToken);

const app = express(); 

app.use(cors());

app.get('/api', (req, res) => {
    res.send('Server Running')
})

app.post('/api/send-sms', (req, res) => {
    console.log('Hello to the Twilio Server')
    res.send('Hello to the Twilio Server');
    // const {  msg } = req.query;
    // client.messages.create({
    //     body: "Hello mesage from twilio ..",
    //     to: "+14155238886",  
    //     from: '+593992366527'
    // }).then((message) => console.log(message.body));

    client.messages
        .create({
            from: 'whatsapp:+14155238886',
            body: 'Hola, Luis Morla!',
            to: 'whatsapp:+593992366527'
        })
        .then(message => console.log(message.body));
})

app.listen(4000, () => console.log("Running on Port 4000"))
