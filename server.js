"use strict";

let express = require('express');
let app = express();
const PORT = 8888;
app.use('/', express.static(__dirname + '/public'));

app.listen(PORT, ()=>{
    console.log('app listen', PORT);
})