const { urlencoded } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/view');
//sets default view engine

app.use(express.static(__dirname + '/public'));
//sets default location to serve static files (imgs, css, etc)

app.use(urlencoded({ extended: true }));
// to read values received via requests

const blogRoutes = require('./routes/blogRoutes.js');

const dbURI = 'mongodb+srv://test_user:test_1234@cluster0.kedxy.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Connected to mongoDB database!')
        app.listen(process.env.PORT || 3000, () => {
            console.log('Your NodeJs server started!');
        })
    })
    .catch(err => console.log(err));

//Blog routes
app.use('/', blogRoutes);






// app.get('/', (req, res) => {
//     const blogs = [{ title: 'I am the black guy', snippet: 'lorema alkf akdf lsdjf lsd' },
//         { title: 'Why rain happens', snippet: 'lsjfs lsjfs dls fksd f' }, { title: 'Even and odd number games', snippet: ' lsjf l sdfj ls fdljsd flsdjf sd' }
//     ];

//     res.render('index', { title: 'Home', blogs });
// })
// app.get('/about', (req, res) => {
//     res.render('about', { title: 'About' });

// })
// app.get('/create-new', (req, res) => {
//     res.render('create-new', { title: 'Write new blog' });
// })



// //middle ware 404 page
// app.use((req, res) => {
//     res.status(404).render('404', { title: '404 Not found' });
// })