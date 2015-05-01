var babelTranspiler     =   require('broccoli-babel-transpiler'),
    sass                =   require('broccoli-sass'),
    mergeTrees          =   require('broccoli-merge-trees'),
    funnel              =   require('broccoli-funnel'),
    bowerConcat         =   require('broccoli-bower-concat');

var source              =   'source';
var public              =   'public';
var bower               =   'bower_components';

var styles              =   funnel(source, { include: ['**/*.scss'] });
var application         =   funnel(source, { include: ['**/*.js'] });

var compiledJS          =   babelTranspiler(application, {
                                modules: 'system'
                            });

var compiledSASS        =   sass([styles], 'app.scss', 'styles.css');
var vendorJS            =   bowerConcat(bower, { extension: 'js' });

module.exports          =   mergeTrees([compiledJS, public, compiledSASS]);