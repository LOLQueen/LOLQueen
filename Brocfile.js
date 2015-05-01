var babelTranspiler     =   require('broccoli-babel-transpiler'),
    sass                =   require('broccoli-sass'),
    mergeTrees          =   require('broccoli-merge-trees'),
    funnel              =   require('broccoli-funnel');


var source              =   'source';
var application         =   funnel(source, { include: ['**/*.js'] });
var compiledJS          =   babelTranspiler(application, {
                                modules: 'system'
                            });

module.exports = compiledJS;