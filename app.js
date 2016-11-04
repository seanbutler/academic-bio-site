
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

function GeneratePage(req, res, pageFilename)
{
    var output = "<H1>ERROR</h1><hr />";

    var layoutFilename = "components/layout.mustache";

    fs.readFile(layoutFilename, 'utf8', function(err, layoutContents) {
        if (err) throw err;
        console.log('Layout Read: ' + layoutFilename);
        // console.log(layoutContents);

        var view = {};

        var headerPartialFilename = "components/header.mustache";

        fs.readFile(headerPartialFilename, 'utf8', function(err, headerContents) {
            if (err) throw err;
            console.log('Component Read: ' + headerPartialFilename);
            // console.log(headerContents);


            var titlePartialFilename = "components/title.mustache";

            fs.readFile(titlePartialFilename, 'utf8', function(err, titleContents) {
                if (err) throw err;
                // console.log('Partial Read: ' + navPartialFilename);
                // console.log(navContents);


                var navPartialFilename = "components/navigation.mustache";

                fs.readFile(navPartialFilename, 'utf8', function(err, navContents) {
                    if (err) throw err;
                    console.log('Component Read: ' + navPartialFilename);
                    // console.log(navContents);

                    var footerPartialFilename = "components/footer.mustache";

                    fs.readFile(footerPartialFilename, 'utf8', function(err, footerContents) {
                        if (err) throw err;
                        console.log('Component Read: ' + footerPartialFilename);
                        // console.log(footerContents);

                        var pagePartialFilename = pageFilename;

                        fs.readFile(pagePartialFilename, 'utf8', function(err, pageContents) {
                            if (err) throw err;
                            console.log('Page Read: ' + pagePartialFilename);
                            // console.log(pageContents);

                            var partials = {
                                header: headerContents,
                                title: titleContents,
                                navigation: navContents,
                                footer: footerContents,
                                page: pageContents,
                            }

                            output = Mustache.render(layoutContents, view, partials);

                            res.send(output);

                            // console.log("Output: " + output);
                            // return output;

                        });
                    });
                });
            });
        });

    });

    console.log("Output: " + output);
    return output;

}


// ----------------------------------------------------------------------------

App.get('/blog', function (req, res) {
    GeneratePost(req, res, "string");
});


function GeneratePost(req, res, postDetails)
{
    var layoutFilename = "components/layout.mustache";

    fs.readFile(layoutFilename, 'utf8', function(err, layoutContents) {
        if (err) throw err;
        // console.log('File Read: ' + layoutFilename);
        // console.log(layoutContents);

        var view = {};

        var headerPartialFilename = "components/header.mustache";

        fs.readFile(headerPartialFilename, 'utf8', function(err, headerContents) {
            if (err) throw err;
            // console.log('Partial Read: ' + headerPartialFilename);
            // console.log(headerContents);

            var titlePartialFilename = "components/title.mustache";

            fs.readFile(titlePartialFilename, 'utf8', function(err, titleContents) {
                if (err) throw err;
                // console.log('Partial Read: ' + navPartialFilename);
                // console.log(navContents);

                var navPartialFilename = "components/navigation.mustache";

                fs.readFile(navPartialFilename, 'utf8', function(err, navContents) {
                    if (err) throw err;
                    // console.log('Partial Read: ' + navPartialFilename);
                    // console.log(navContents);

                    var footerPartialFilename = "components/footer.mustache";

                    fs.readFile(footerPartialFilename, 'utf8', function(err, footerContents) {
                        if (err) throw err;
                        // console.log('Partial Read: ' + footerPartialFilename);
                        // console.log(footerContents);

                        var pagePartialFilename = "posts/2016-10-07 12:00.00 The First Paper on Computers Generating Stories.txt";

                        fs.readFile(pagePartialFilename, 'utf8', function(err, pageContents) {
                            if (err) throw err;
                            // console.log('Partial Read: ' + pagePartialFilename);
                            // console.log(pageContents);

                            var partials = {
                                header: headerContents,
                                title: titleContents,
                                navigation: navContents,
                                footer: footerContents,
                                page: pageContents
                            };

                            var output = Mustache.render(layoutContents, view, partials);
                            // console.log("Output: " + output);
                            res.send(output);
                        });
                    });
                });
            });
        });
    });

}

// ----------------------------------------------------------------------------
