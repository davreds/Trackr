const path = require('path')
const express = require('express')

const port = process.env.PORT || 3000
const app = express()
const publicDir = path.join(__dirname, 'public')

app.use(express.static(publicDir))

app.get('/projects', function(req, res){
    res.sendFile(path.join(publicDir, '/projects.html'))
})

app.get('*', function(req, res) {
    res.send({
        error: 'Error: The route does not exist.'
    })
})


app.listen(port, function() {
    console.log('up and running')
})
