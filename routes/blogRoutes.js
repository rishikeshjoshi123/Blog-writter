const Blog = require('../model/blogs');

const express = require('express');
const router = express.Router();
const mongo = require('mongodb');
const { route } = require('express/lib/application');


router.get('/', (req, res) => {

    Blog.find().
    then((result) => {
            // console.log(result);
            res.render('index', { title: 'Home', blogs: result });
        })
        .catch((err) => {
            console.log('Error occured in finding blogs in DB. Error:', err);
        });
})

router.get('/about', (req, res) => {
    res.render('about', { title: 'About' });

})

router.get('/create-new', (req, res) => {
    res.render('create-new', { title: 'Write new blog' });
})

router.post('/create-new', async(req, res) => {

    try {
        const blog = new Blog({
            title: `${req.body.Title}`,
            snippet: `${req.body.Snippet}`,
            body: `${req.body.Body}`,
        });

        const result = await blog.save();
        console.log('redirecting to / endpoint after succesfully creating new blog. id=', result.id);

        // res.render('index', { title: 'Home', blogs: result });
        res.redirect('/');
    } catch (err) {
        console.log('Cant save document. Error: ', err);
    }

})

router.get('/show-full-content/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id).
    then((result) => {
        res.render('show-full-content', { title: result.title, blog: result });
    }).catch(err => console.log('Error occured in finding document. ', err));
})

router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/' });
        }).catch(err => console.log('Error occured in deleting. Erro: ', err));

});

router.get('/update-form/:id', async(req, res) => {

    try {
        const id = req.params.id;
        const blog = await findInDB(id);

        res.render('update-form', { title: `Update ${blog.title}`, blog });
    } catch (err) {
        console.log('Error occured while finding object in DB.', err);
    }

});

router.post('/save-updated', async(req, res) => {

    const id = req.body.ID;
    console.log('reached /save-updated route. id is', id);
    const blog = new Blog({
        title: req.body.Title,
        snippet: req.body.Snippet,
        body: req.body.Body,
        _id: id
    });
    console.log('form submitted for updation is->', blog);
    try {
        let result = await Blog.findByIdAndUpdate(id, blog);

        res.redirect(`/show-full-content/${id}`);
    } catch (err) { console.error(err); }


});

//middle ware 404 page
router.use((req, res) => {
    res.status(404).render('404', { title: '404 Not found' });
})




//contorllers
async function findInDB(id) {
    try {
        let blog = await Blog.findById(id);

        return blog;
    } catch (err) {
        console.error('Cant find blog in DB.', err);
    }
}

module.exports = router;