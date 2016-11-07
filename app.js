
var Express = require('express');
var App = Express();
var Mustache = require('mustache');
var fs = require('fs');

// ----------------------------------------------------------------------------

App.use(Express.static('public'));
App.use(Express.static('lib'));

// ----------------------------------------------------------------------------

// TODO - make blog more flexible with proper simple query on title and/or date-time

//
// STARTUP
//

App.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});



// ----------------------------------------------------------------------------

//
// ROUTING
//

App.get('/', function (req, res) {
    GeneratePage(req, res, 'pages/root.mustache')
});

App.get('/teaching', function (req, res) {
    GeneratePage(req, res, 'pages/teaching.mustache')
});

App.get('/research', function (req, res) {
    GeneratePage(req, res, 'pages/research.mustache')
});

App.get('/games', function (req, res) {
    GeneratePage(req, res, 'pages/games.mustache')
});

App.get('/cannon', function (req, res) {
    GeneratePage(req, res, 'pages/cannon.mustache')
});

App.get('/cv', function (req, res) {
    GeneratePage(req, res, 'pages/cv.mustache')
});

// ----------------------------------------------------------------------------

//
// PAGE GENERATION from CONTENT with PARTIALS Build in
//

var layoutFilename, layoutContents;
var headerPartialFilename, headerPartialContents;
var titlePartialFilename, titlePartialContents;
var navPartialFilename, navPartialContents;
var footerPartialFilename, footerPartialContents;

InitialisePartials();

function InitialisePartials()
{
    layoutFilename = "components/layout.mustache";
    layoutContents = fs.readFileSync(layoutFilename, 'utf8');

    headerPartialFilename = "components/header.mustache";
    headerPartialContents = fs.readFileSync(headerPartialFilename, 'utf8');

    titlePartialFilename = "components/title.mustache";
    titlePartialContents = fs.readFileSync(titlePartialFilename, 'utf8');

    navPartialFilename = "components/navigation.mustache";
    navPartialContents = fs.readFileSync(navPartialFilename, 'utf8');

    footerPartialFilename = "components/footer.mustache";
    footerPartialContents = fs.readFileSync(footerPartialFilename, 'utf8');
}

// ----------------------------------------------------------------------------

function GeneratePage(req, res, pagePartialFilename)
{
    var pagePartialContents = fs.readFileSync(pagePartialFilename, 'utf8');

    var view = {

    };

    var partials = {
        header: headerPartialContents,
        title: titlePartialContents,
        navigation: navPartialContents,
        footer: footerPartialContents,

        page: pagePartialContents
    };

    output = Mustache.render(layoutContents, view, partials);

    res.send(output);
}

// ----------------------------------------------------------------------------

App.get('/blog', function (req, res) {
    var fileList = ScanDir('./posts/');
    GeneratePosts(req, res, fileList);
});

function ScanDir(path) {
    const fs = require('fs');
    var dirList = fs.readdirSync(path);
    console.log(dirList);
    return dirList;
}

function GeneratePosts(req, res, postFilenames)
{
    var pagePartialContents = "";
    postFilenames.forEach(file => {
        pagePartialContents += fs.readFileSync("./posts/" + file, 'utf8')
        console.log("- - " + pagePartialContents);
    });

    var view = {

    };

    var partials = {
        header: headerPartialContents,
        title: titlePartialContents,
        navigation: navPartialContents,
        footer: footerPartialContents,

        page: pagePartialContents
    };

    output = Mustache.render(layoutContents, view, partials);
    res.send(output);
    //   console.log(file);

}

// ----------------------------------------------------------------------------
