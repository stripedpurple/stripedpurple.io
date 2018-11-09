let express = require('express');
let router = express.Router();
let nodemailer = require('nodemailer');
let fs = require('fs');
let config = require('../lib/config.js');

let email = config.get('/opt/dev/config/stripedpurple', 'emailAddress');
let password = config.get('/opt/dev/config/stripedpurple', 'emailPassword');
let contactFile = config.get('/opt/dev/config/stripedpurple', 'contactFile');


/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {home: true});
});

router.get('/portfolio', (req, res, next) => {
    res.render('portfolio', {title: 'Portfolio'});
});


// Contact

router.post('/contact', (req, res, next) => {
    let info = {};
    for (let key in req.body) {
        info[key] = req.body[key];
    }

    console.log(req.body);

    if (!info.name || info.name === ''){
        res.status(400).send('Name is required!');
        return;
    }

    if (!info.email || info.email === ''){
        res.status(400).send('Email is required!');
        return;
    }

    fs.appendFile(contactFile, JSON.stringify(info) + "\n", function (err) {
        if (err) {
            log.error('Error writing to ' + contactFile, err);
        }
    });

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });

    const mailOptions = {
        from: 'austin@stripedpurple.io',
        to: info.email,
        subject: 'Thanks for contact Striped Purple!',
        html: '<!doctype html><html> <head> <meta name="viewport" content="width=device-width"> <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> <title>Thanks for contacting Striped Purple!</title> <style>@media only screen and (max-width: 620px){table[class=body] h1{font-size: 28px !important; margin-bottom: 10px !important;}table[class=body] p,table[class=body] ul,table[class=body] ol,table[class=body] td,table[class=body] span,table[class=body] a{font-size: 16px !important;}table[class=body] .wrapper,table[class=body] .article{padding: 10px !important;}table[class=body] .content{padding: 0 !important;}table[class=body] .container{padding: 0 !important; width: 100% !important;}table[class=body] .main{border-left-width: 0 !important; border-radius: 0 !important; border-right-width: 0 !important;}table[class=body] .btn table{width: 100% !important;}table[class=body] .btn a{width: 100% !important;}table[class=body] .img-responsive{height: auto !important; max-width: 100% !important; width: auto !important;}}@media all{.ExternalClass{width: 100%;}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height: 100%;}.apple-link a{color: inherit !important; font-family: inherit !important; font-size: inherit !important; font-weight: inherit !important; line-height: inherit !important; text-decoration: none !important;}.btn-primary table td:hover{background-color: #34495e !important;}.btn-primary a:hover{background-color: #34495e !important; border-color: #34495e !important;}}</style> </head> <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"> <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td><td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;"> <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;"> <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Thanks for contacting Striped Purple!</span> <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;"> <tr> <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;"> <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">' + req.body.name + ',</p><p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thanks for contacting Striped Purple. I will be in touch ASAP. </p><br><table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;"> <tbody> <tr> <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;"> <tbody> <tr> <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; background-color: #3498db; border-radius: 5px; text-align: center;"> <a href="http://htmlemail.io" target="_blank" style="display: inline-block; color: #ffffff; background-color: #3498db; border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-transform: capitalize; border-color: #3498db;">Visit StripedPurple.io</a> </td></tr></tbody> </table> </td></tr></tbody> </table> </td></tr></table> </td></tr></table> <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;"> <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;"> <tr> <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> <ul style="list-style-type: none; margin: 0; padding: 0;"> <li style="display: inline-block"> <a href="//:stripedpurple.io/insta"> <img style="max-width:24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALQSURBVGhD7ZnXyhRBEIVXL02/+hZi+o1geAcxPorhwvAoKuKNqJjAdKF4Keqd8QHUBzCgGM4H21A0Z3fS9gzKHPjYoae2emu6u7qmdzJq1KhR/71WiL3igrgs7otHHcEHvvC5R9BHMeH8hHgv/hSGPo6JhQe0RtwSrtOS3BT0vRCtFa+E66gPXopVopMY2r5H4qE4Of1MbTdEp2nGmoidlOaBiCIRpHtHaWgjnkAfCztySkSdEeneW9FqVEixsZM+YASS+NFxRGC3aCxyenTSlE+CeX5pCte0OdsIdqfF49CWOCcai85zR1X8Emxs+8RKkYu2/eKKwNb5mMdF0Vj5sFbxRuwQdYXtO+F8zSJOvdp6JpwzxxOxXjTVBsF3nU8Hv6mx6gZCNlkSTgS3a8osG9o/COc7p1ggzPNlkWu7uCd+imTL9W3BvVw7xW8RfTuKBcLCznVcfBPOHrh3ROQiATj7SLFAyE5R28R34WwjX8QWEXVAONtIkUA+ijzF3hXO1nFHROHrs3C2iSKB5KmQhf1DOFsHtlTWUVUpv0ggbJhRlA/Obh5ks6iqTXgMxDlL5FNrneg6tVx9FSkSCAVgvthZwM7WwQtb1GCLHSgAo7YKUquzjWCzWUQdFM42UiwQNrFcvMnN2xC/ikMi11Xh7CPFAqFEcRUvmx1TJ64ZrmnbJHKx6ActUYCCb1ZBSALgR1JLce20UQxeNCaeCkrypiIIvut8OloF0vTFioMKnnxdse/UHYlEqxertq+6LFoKwDw1I9rITtjUWRM5rV51zwvnrC7sCTxBHghwXbVPVNHq8IFTcedsSPKSppY4V2p6OFASDjdaH5tytO+cDsFh0Vo8AY72neM+uSY6iyP9F8J10AfPRee/FZL4s+W6cB2VhJFYLRYqphmnH30kgNei05qoIwJiVyansz8s6s9QfJ0VpNjW2WnUqFGj/gVNJn8BI2A0u6zHe84AAAAASUVORK5CYII="> </a> </li><li style="display: inline-block"> <a href="//:stripedpurple.io/twitter"> <img style="max-width:24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAI5SURBVGhD7dnNi01xHMfxK0MxCtnaTJlJiiywUh5GUtM0GxspG5LChqWUWChKjMXUyNNas5pmZUH5B+RZdiRJlI3k+f2RU6df3zv3d8493/sb0+9Tr8U9c+/3dz73cc45rZycnJx5l124hbuJ3MROdJWz+D1HnEGtDMMamNIOVM5tWMNSuoHKuQdrWErap8p5AGtYStqnyslFHM25Iu/xEp9L22K4FPlpbOtkGhtQZCH24Cn096+YwLt/t0MuRc7jarBtNpexAFZWYBTLcBDW48WlyCZox8ZL29p5BD37nbIXU7gGa45LkQEUOYYvsO4nRxCbtfgEa45LkW0oZw3uwPrsbEFMNuIDwscXXIroQ2llCOfwED+g+25FTE4hXKfMpcg3bMZs6cc6rPp7q3P0hWCtVXApchQXsRJNRW9Na62CS5ERNJ0nsNYquBSZQZNZDWudMpcichJN5TCsNcrcish1DKKb6If1Maz5ZW5FvuMAdiPml7tdxmDND7m+Ijok7iZL8RzW7JBrEbmExaiTSVgzLe5F5BVOYz1icwjWrHZ6UuQNjqMPMTmBX7BmtdN4Ee30M9zHFejHMbbAElQ5jilrvIjeRvuxCLHRt9o+6LHWzBiNFym8xQXocHU5wmibztvqaPI1rBlVuBUJfcQL6FnXCQbrPt3oWRFvuYg1LKVaRebNSWxdpbKGpaT/tCtHF1WsYSltR63ocpc1MIXal96K6JXRS2pdqOwFrR2eQ8vJycn5r9Nq/QHBPjzcpQCwKwAAAABJRU5ErkJggg=="> </a> </li><li style="display: inline-block"> <a href="//:stripedpurple.io/messenger"> <img style="max-width:24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALjSURBVGhD7dlLqE1RHMfxQ/KIKDHwLo/ERJEkySsRAyMjzExJZookkyskKaakKKIYmJBXmXmUECMKieSRRx55fH91Vu12/3PXWnvtx7l1fvXp3nZnPf737nPWWvu0eumll1ozBZtxABdwG3fb9Luu9WETJqOrosnvxhP8i/QYaqs+GstMnMYvWJOMoT7Ul/qsLcOh2+MnrEmlUJ/7MQyVZi4ewppEmR5gNirJCnyANXAVNNYylJrV+AFrwCp9x0qUkoX4BmugOmjs+UjKeLyENUCdXmAcCuccrI6bcAaFsh5Wh01ai6gMgj4Crc6adA+aW3DWweqoG6xBcC7C6iTGb+NarD/GtfMIykikrhnPMB2nMtdi6Bbah7eZa47mNgLepN5WKmIiXLYj5L+jv/4laAcxC69gvU6C3vR7YTUOkS/CRVuNd7DafMVxaPKKfvrWrj3w5iysxj6dinDRmUMHLPf619iFsXAJKUKC1hSd5KzG/fEV4aIjwGFswVBdyCS0CLkJb2LXj9Ai+osOVDFbofvwRp8YVmOLipiElMQWIbpFvbkFq3GeVcRo7MBJjNEFT4oUIdfhjc7OVuOsfBHTcAif4V7zFHPQKUWLEM3RG32SWI2dbBGLoB1yp3VChW1APilFiObojT7zrcaiIqZiI+60r/n8hVbpwVBmIKUIWQ5v9ATjC/KN3+AgnmeuxbgMnfRSi9Dcgp+yFN0j1UFzC84SWJ10g6WIyg1YHTVJS0N0FkNvVKvDJmgumlOhaFdqddoEzaVwRuERrI7rpDnowJcU7UrfwxqgDjrHaAEtJQvwCdZAVdKYGrvUnIA1WFW0cM5D6anzjX8VE1BJ6ijkI7Yh6iFcbKosRLtkfYGa9KA6NL5C9Lwp5nmYvje8hq3Qgay2dCpEkz8GnVG0K9UZRc+yjkIHoCvQPa9zi/rYiVVIXheKJl+IK6Drvi/3xRUyYAtwOYIBXYDLkPbPXnrxptX6Dzdbru2hKoPCAAAAAElFTkSuQmCC"> </a> </li><li style="display: inline-block"> <a href="//:stripedpurple.io/github"> <img style="max-width:24px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANRSURBVGhD7dlZqE1RHMfxa0ghhExRxkRIUkiGMmTIgyFTtxCZXkiSEIqSN0SRJA+SFA9CMhTxICFTUQqZJfM8+/6us2u17//cu9c5e917Zf/q073nnH3+a5+z917DPiVZsmSp9jRFvb///htphRnYjYt4i9+Ob7iNg1iK3qgxqYUxOIofcHc8iRtYgoaotgzCJVg76OsFFqEuqiwNsAO/YO1UMS6jG4KnPa7D2om0vMcEBEt3PILVeNp0vc1F6mmHh7AaDUWnbilSi66J0KdTPl/RD6lkO6xGZCaGYBUe557zpSO9EuoF5+Sec91DYxSVwcjXO6nLdKPRex1+ItrmEx7gau7vZ0SvaTtt7476GpfeINomsgkFR0UrGiduwcpUzEanskfl0wW6kKeUPSqfO4i39R1dUVDGIl7QdRchkq9T0dSnoGjaYRWMaO6U9kis08w9NV1f0AxeaQ0dTqugK7UeJZeBsNqJzINXNIu1Crmeog3SjMYrdSJWe3IYXtH5aBVyjUOIqBOw2pPXqI3E0XrCKhS5gFBRb3kNVrui+V7ixBdFcYsRMsthtSsjkSj6RqwCLo3CITMCVrsyHYnSBFYBV0+ETF9Y7UriWbEupsqWrUMRMqNgtSuTkTjPYRWJ6OZByKyG1a4MQ+LopoBVJBK616po2dALibMfVhHXJITILFjtyUd43SObD6uQS9Ntr28nQfpDO2u1J6fhlc6wCsW9xHikkWmobPxaA+/chFXMchLDUQc+0fajcQZWXZdmxVrLeEfL2HgxdctaR8efj2jCtxfLMABWNJhq5N4HHVGrjuU4Coouqidwi51Ac+x0nrNcQUtY6Qifox3RkSs4CxAvuAXKZsRfk1doi4qiU0Q34qz3W7TIKyrq00/BLaqbEX2g16wjswJJshbx91p0wyLf+t8rOhXi394uRNHPCT2gRZHugSWNjlq+Za1LZ0Vq0WzUvcj1wRqh2NyHu9Nx25B6dGPZnUwegs8RsHIe7o67DsC3O08cTUvcQesZ9mBjju9pcA7uzkfUkQT7EFH0+0W+SaV2zCfxD/IBC1Fl0U9l6xHvBIr5IMfQAdUS3Q7ainco5IOcxRGoM6kRqY+J2FD2KHla5P5myZIly3+VkpI/CXqqzeTbW68AAAAASUVORK5CYII="> </a> </li></ul> </td></tr><tr> <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">Striped Purple, 301 Chestnut St, Harrisburg PA 17101</span> </td></tr><tr> <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;"> Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>. </td></tr></table> </div><a href="https://icons8.com" style="display: none; visibility: hidden">Icon pack by Icons8</a> </div></td><td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td></tr></table> </body></html>'
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        }else{
            console.log(info);
            res.status(200).send();
        }
    });


    const mailOptions2 = {
        from: 'austin@stripedpurple.io',
        to: 'austin@stripedpurple.io',
        subject: 'Website Contact',
        text: 'Name:\t' + info.name +
              '\nEmail:\t' + info.email +
              '\nMessage:\t' + info.message
    };

    transporter.sendMail(mailOptions2, function (err, info) {
        fs.write
        if (err) {
            console.log(err);
        }else{
            console.log(info);
        }
    });


});


// Redirects
router.get('/blog', (req, res, next) => {
    res.redirect('https://medium.com/@stripedpurple')
});

router.get(['/codez', '/github'], (req, res, next) => {
    res.redirect('https://github.com/viruscmd')
});

router.get('/messenger', (req, res, next) => {
    res.redirect('http://m.me/austin.barrett.583')
});

router.get('/instagram', (req, res, next) => {
    res.redirect('https://www.instagram.com/stripedpurple/')
});

router.get('/twitter', (req, res, next) => {
    res.redirect('https://twitter.com/_stripedpurple')
});


module.exports = router;
