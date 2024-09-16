const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const jwt = require('jsonwebtoken');
const secretKey ='mySecretKey@1411'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.post('/login', (req, res)=> {
    console.log(req.body);

    const user = req.body;
    delete user.password;
    // generate token
    const token = jwt.sign(user, secretKey, {
        expiresIn: '24h'
    })
    res.send({
        code: 200,
        data: token,
        error: false
    });
});

app.get('/getData', (req, res)=> {
    let token  = req.headers?.authorization;
    console.log(token);
    if(!token) throw new Error('token is required');
    token = token.replace('Bearer ', '');
    const decoded = jwt.verify(token, secretKey);
    if(!decoded) throw new Error('Authentication failed');
    res.send({
        code: 200,
        data: decoded,
        error: false
    })
})

app.listen(port, () => {console.log('listening on port' + port);});