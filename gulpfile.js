/*
 * Define plugins
 */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jshintStylish = require('jshint-stylish');

var paths = {
    script_page: './js/pages/*.js', 
    script_main: './js/*.js'
};

/*
 * Lint your JavaScript
 */
gulp.task('js-lint', function () {
    return gulp.src(paths.script_page)
        .pipe($.jshint())
        .pipe($.jshint.reporter(jshintStylish));
});

/*
 * Lint your JavaScript
 */
gulp.task('js-lint-1', function () {
    return gulp.src(paths.script_main)
        .pipe($.jshint())
        .pipe($.jshint.reporter(jshintStylish));
});

/*
 * Beautify your JavaScript
 */
gulp.task('beautify-js', ['js-lint'], function () {
    return gulp.src(paths.script_page)
        .pipe($.jsbeautifier({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_AND_WRITE'
        }))
        .pipe(gulp.dest('./js/pages/'));
});

/*
 * Beautify your JavaScript
 */
gulp.task('beautify-js-1', ['js-lint-1'], function () {
    return gulp.src(paths.script_main)
        .pipe($.jsbeautifier({
            config: '.jsbeautifyrc',
            mode: 'VERIFY_AND_WRITE'
        }))
        .pipe(gulp.dest('./js/'));
});

/*
 * Watchers
 */
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['beautify-js']);
    gulp.watch(paths.css, ['beautify-js-1']);
    gulp.watch(paths.scripts, ['js-lint']);
    gulp.watch(paths.css, ['js-lint-1']);
});

gulp.task('default',['beautify-js','beautify-js-1']);
