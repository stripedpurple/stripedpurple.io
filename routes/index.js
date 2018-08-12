let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Home'});
});

router.get('/portfolio', (req, res, next) => {
    res.render('portfolio', {title: 'Portfolio'});
});



// Redirects
router.get(['/codez', '/github'], (req, res, next) =>  {
    res.redirect('https://github.com/viruscmd')
});

router.get('/messenger', (req, res, next) =>  {
    res.redirect('http://m.me/austin.barrett.583')
});

router.get('/instagram', (req, res, next) =>  {
    res.redirect('https://www.instagram.com/stripedpurple/')
});

router.get('/twitter', (req, res, next) =>  {
    res.redirect('https://twitter.com/_stripedpurple')
});


module.exports = router;
