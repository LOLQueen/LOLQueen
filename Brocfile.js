var babelTranspiler         =   require('broccoli-babel-transpiler'),
    sass                    =   require('broccoli-sass'),
    mergeTrees              =   require('broccoli-merge-trees'),
    funnel                  =   require('broccoli-funnel'),
    bowerConcat             =   require('broccoli-bower-concat'),
    fastBrowserify          =   require('broccoli-fast-browserify'),
    angularTemplatesCache   =   require('broccoli-angular-templates-cache');

var source                  =   'source';
var public                  =   'public';
var bower                   =   'bower_components';

var styles                  =   funnel(source, { include: ['**/*.scss'] });
var application             =   funnel(source, { include: ['**/*.js'] });
var html                    =   funnel(source, { include: ['**/*.html'] });

/* browserify stuff */
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
var vendorJS                =   bowerConcat(bower, { extension: 'js' });

module.exports              =   mergeTrees([compiledJS, public, compiledCSS, vendorJS, templates]);