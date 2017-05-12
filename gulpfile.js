var gulp = require('gulp'),
    minifycss = require('gulp-clean-css'), // for minifying the css
    concat = require('gulp-concat'), // concatinating the resources both js and css
    uglify = require('gulp-uglify'),
    gutil = require('gulp-util'), // minifying the js files. triggered only in 'deploy' task below
    del = require('del'),// removing files from a directory
    jshint = require('gulp-jshint'), // check the validity of js files
    stylish = require('jshint-stylish'), // to display the jshint messages in a human readable format with line number and file name
    templateCache = require('gulp-angular-templatecache'), // to cache angular.js templates
    htmlmin = require('gulp-htmlmin'), // to minify html templates
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    rev = require('gulp-rev'),
    cachebust = require('gulp-cache-bust'),
	ngmin = require( 'gulp-ng-annotate' );



var options = new function() {

    this.ANGULAR_MODULE_NAME = 'app',

        // Source
        this.PARTIALS_SRC = 'app/js/**/*.tpl',
        this.FONTS_SRC = 'app/fonts/**/*',
        this.IMAGES_SRC = 'app/img/**/*',

        this.CSS_SRC = ['app/libs/css/**/*.css', 'app/css/**/*.css'], // 0 index must be vendor libs for convention sake
        this.SASS_SRC = ['app/sass/**/*.sass', 'app/sass/**/*.scss'],

        this.JS_SRC = ['app/libs/js/**/*.js', 'app/js/app.js', 'app/js/**/*.js'], // 0 index must be vendor libs for convention sake

        this.JS_SRC_DEV = ['app/libs/js/**/*.js', 'app/profiles/dev/**/*.js', 'app/js/app.js', 'app/js/**/*.js'], // 0 index must be vendor libs for convention sake
        this.JS_SRC_STAGING = ['app/libs/js/**/*.js', 'app/profiles/staging/**/*.js', 'app/js/app.js', 'app/js/**/*.js'], // 0 index must be vendor libs for convention sake
        this.JS_SRC_INT = ['app/libs/js/**/*.js', 'app/profiles/int/**/*.js', 'app/js/app.js', 'app/js/**/*.js'], // 0 index must be vendor libs for convention sake
        this.JS_SRC_PROD = ['app/libs/js/**/*.js', 'app/profiles/prod/**/*.js', 'app/js/app.js', 'app/js/**/*.js'], // 0 index must be vendor libs for convention sake


        this.DIST_SRC = 'dashboard', // specific to spring-starter-project. change to suit your project needs.

        //Destination	
        this.PARTIALS_DEST = 'app/js/bin/template',
        this.FONTS_DEST = this.DIST_SRC + '/fonts',
        this.IMAGES_DEST = this.DIST_SRC + '/img',
        this.JS_DEST = this.DIST_SRC + '/js',
        this.CSS_DEST = this.DIST_SRC + '/css',

        this.JS_DEST_NAME = 'app.min.js',
        this.CSS_DEST_NAME = 'app.min.css',
        this.TEMPLATES_DEST_NAME = 'templates.js'

};

gulp.task('clean',function(){
    return del(['dashboard/js/**/*','dashboard/css/**/*']); //'static/fonts/**/*','static/images/**/*'
});

gulp.task('jshint', function() {
    return gulp.src(options.JS_SRC.concat('!' + options.JS_SRC[0]) // excluding vendor libs from lint checking
            .concat('!' + options.PARTIALS_DEST + '/**/*.js')) // excluding angular templates from lint checking
        .pipe(jshint({ globals: { angular: true } })) // adding angular to global scope to avoid angular not found errors in lint
        .pipe(jshint.reporter(stylish));
});

gulp.task('template-cache', function() {
    return gulp.src(options.PARTIALS_SRC)
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(templateCache(options.TEMPLATES_DEST_NAME, { standalone: true }))
        .pipe(gulp.dest(options.PARTIALS_DEST));
});

gulp.task('js-dev', ['jshint', 'template-cache'], function() {
    return gulp.src(options.JS_SRC_DEV)
        .pipe(concat(options.JS_DEST_NAME))
        .pipe(gulp.dest(options.JS_DEST));
});

gulp.task('js-int', ['jshint', 'template-cache'], function() {
    return gulp.src(options.JS_SRC_INT)
        .pipe( ngmin() )
        .pipe( uglify() )
        .pipe(concat(options.JS_DEST_NAME))
        .pipe(rev())
        .pipe(gulp.dest(options.JS_DEST));
});
gulp.task('js-staging', ['jshint', 'template-cache'], function() {
    return gulp.src(options.JS_SRC_STAGING)
        .pipe( ngmin() )
        .pipe( uglify() )
        .pipe(concat(options.JS_DEST_NAME))
        .pipe(gulp.dest(options.JS_DEST));
});
gulp.task('js-prod', ['jshint', 'template-cache'], function() {
    return gulp.src(options.JS_SRC_PROD)
        .pipe( ngmin() )
        .pipe( uglify() )
        .pipe(concat(options.JS_DEST_NAME))
        // .pipe(rev())
        .pipe(gulp.dest(options.JS_DEST));
});

gulp.task('fonts', function() {
    return gulp.src(options.FONTS_SRC)
        .pipe(gulp.dest(options.FONTS_DEST))
})

gulp.task('imgs', function() {
    return gulp.src(options.IMAGES_SRC)
        .pipe(gulp.dest(options.IMAGES_DEST))
})

gulp.task('compile-sass', function() {
    var stream = gulp.src(options.SASS_SRC)
        .pipe(concat('app.min.scss'))
        .pipe(sass())
        .on('error', gutil.log)
        .pipe(gulp.dest('app/css/sass'))
    return stream;
})

gulp.task('css-dev', ['compile-sass'], function() {
    return gulp.src(options.CSS_SRC)
        .pipe(concat(options.CSS_DEST_NAME))
        .pipe(autoprefixer({ cascade: false }))
        .pipe(gulp.dest(options.CSS_DEST))
})

gulp.task('css-staging', ['compile-sass'], function() {
    return gulp.src(options.CSS_SRC)
        .pipe(concat(options.CSS_DEST_NAME))
        .pipe(autoprefixer({ cascade: false }))
        .pipe( minifycss() )
        .pipe(gulp.dest(options.CSS_DEST))
})

gulp.task('css-prod', ['compile-sass'], function() {
    return gulp.src(options.CSS_SRC)
        .pipe(concat(options.CSS_DEST_NAME))
        .pipe(autoprefixer({ cascade: false }))
        .pipe( minifycss() )
        // .pipe(rev())
        .pipe(gulp.dest(options.CSS_DEST))
})
gulp.task('uncache',function(){
        gulp.src(options.DIST_SRC+'/index.html')
        .pipe(cachebust({
            type: 'timestamp'
        }))
        .pipe(gulp.dest('./'+options.DIST_SRC));
})

gulp.task('default', ['js-dev', 'fonts', 'imgs', 'css-dev'], function() {
    gulp.watch(options.JS_SRC, ['js-dev']);
    gulp.watch(options.IMAGES_SRC, ['imgs']);
    gulp.watch(options.FONTS_SRC, ['fonts']);
    gulp.watch(options.CSS_SRC.concat(options.SASS_SRC), ['css-dev']);
    gulp.watch(options.PARTIALS_SRC, ['template-cache']);

});

gulp.task('int', ['js-int', 'fonts', 'imgs', 'css-staging','uncache'], function() {
});

gulp.task('staging', ['js-staging', 'fonts', 'imgs', 'css-staging'], function() {
});

gulp.task('deploy', ['js-prod', 'fonts', 'imgs', 'css-prod','uncache'], function() {
});

