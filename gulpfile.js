var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var sass = require('gulp-sass');
var concatCss = require('gulp-concat-css');

function compile(watch) {
    var bundler = watchify(browserify('./frontend/js/index.js', {

        debug: true
    }).transform(babel.configure({
        "presets": ["es2015"]
    })));

    function rebundleJs() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('build.js'))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('./public/js'));
    }
    function rebundleCss() {
        return gulp.src('./frontend/styles/index.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(concatCss("main.css"))
            .pipe(gulp.dest('./public/styles'));
    }
    if (watch) {
        bundler.on('update', function() {
            console.log('-> bundling...');
            rebundle();
        });
    }

    rebundle();
    rebundle();

    function rebundle(){
        rebundleCss();
        rebundleJs();
    }
}

function watch() {
    return compile(true);
};

gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);