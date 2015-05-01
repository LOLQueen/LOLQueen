const   babelTranspiler     =   require('broccoli-babel-transpiler'),
        sass                =   require('broccoli-sass'),
        mergeTrees          =   require('broccoli-merge-trees'),
        funnel              =   require('broccoli-funnel');

const   source              =   'source';
const   public              =   'public';

const   styles              =   funnel(source, { include: ['**/*.scss'] });
const   application         =   funnel(source, { include: ['**/*.js'] });

var     compiledJS          =   babelTranspiler(application, {
                                    modules: 'system'
                                });

var     compiledSASS        =   sass([styles], 'app.scss', 'styles.css');

module.exports              =   mergeTrees([compiledJS, public, compiledSASS]);