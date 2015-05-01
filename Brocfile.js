var path                    =   require('path');

var babelTranspiler         =   require('broccoli-babel-transpiler'),
    sass                    =   require('broccoli-sass'),
    mergeTrees              =   require('broccoli-merge-trees'),
    funnel                  =   require('broccoli-funnel'),
    bowerConcat             =   require('broccoli-bower-concat'),
    fastBrowserify          =   require('broccoli-fast-browserify'),
    angularTemplatesCache   =   require('broccoli-angular-templates-cache'),
    jshint                  =   require('broccoli-jshint');

var source                  =   'source';
var public                  =   'public';
var bower                   =   'bower_components';


/*  just some constants */
var styles                  =   funnel(source, { include: ['**/*.scss'] });
var application             =   funnel(source, { include: ['**/*.js'] });
var html                    =   funnel(source, { include: ['**/*.html'] });

/*  jshint  */
var jshintTree              =   jshint(application, {
                                    jshintrcPath: path.join(__dirname, '.jshintrc')
                                });

/*  kill all jshint tree files  */
    jshintTree              =   funnel(jshintTree, { exclude: ['**/*'] });

/*  browserify stuff */
var transforms              =   [ {tr:'babelify'}, {tr:'browserify-ngannotate'} ];
var bundles                 =   { 
                                    'index.js': { 
                                        transform: transforms,
                                        entryPoints: ['app.module.js'],
                                    }
                                };

/*  compile source to es5   */
var compiledJS              =   fastBrowserify(application, { bundles: bundles });

var templates               =   angularTemplatesCache(html, { 
                                    moduleName: 'app',
                                    fileName: 'template-cache.js',
                                    minify: { collapseWhitespace: true }
                                });

var compiledCSS             =   sass([styles], 'app.scss', 'styles.css');

/*  moving fonts   */
var fonts                   =   funnel(bower, {
                                    srcDir: 'bootstrap-sass/assets/fonts',
                                    destDir: 'fonts'
                                });

var vendorJS                =   bowerConcat(bower, { extension: 'js' });

module.exports              =   mergeTrees([compiledJS, public, compiledCSS, vendorJS, templates, fonts, jshintTree]);