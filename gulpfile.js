/**
 * Created by hwh on 2017/3/31.
 */
var gulp         = require('gulp'),
    // uglify       = require('gulp-uglify'),
    less         = require('gulp-less'),
    watch        = require('gulp-watch'),
    runSequence  = require('run-sequence'),
    rev          = require('gulp-rev'),
    revCollector = require('gulp-rev-collector');

var config = {
    less: './public/less/*.less',
    js: './public/js/*.js',
    img: './public/image/*.{png,jpg,gif,ico}',
    destCss: './public/dist/css',
    destJs: './public/dist/js',
    destImg: './public/dist/image'
};
gulp.task('js', function () {
    return gulp.src(config.js)
        //.pipe(uglify())
        .pipe(gulp.dest(config.destJs));
});

gulp.task('less', function () {
    return gulp.src(config.less)
        .pipe(less({
            compress: true
        }))
        .pipe(gulp.dest(config.destCss));
});
gulp.task('lessWithOutCompress', function () {
   return gulp.src(config.less)
        // .pipe(watch(config.less))
        .pipe(less())
        .pipe(gulp.dest(config.destCss));
});
gulp.task('img', function() {
    return gulp.src(config.img)
        .pipe(gulp.dest(config.destImg));
});
gulp.task('mainFest', function() {
    return gulp.src(['./public/dist/css/*.css', './public/dist/js/*.js', './public/dist/image/*.{png,jpg,gif,ico}'])
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('./public/dist'));
});
gulp.task('replaceEjs', function() {
    return gulp.src(['./public/**/*.json', './views/*.ejs'])
        .pipe(revCollector())
        .pipe(gulp.dest('./views'));
});
gulp.task('replaceCss', function() {
    return gulp.src(['./public/**/*.json', './public/dist/css/*.css'])
        .pipe(revCollector())
        .pipe(gulp.dest(config.destCss));
});
gulp.task('dev', function(done) {
    runSequence(
        'js',
        'lessWithOutCompress',
        'img',
        'mainFest',
        'replaceCss',
        'replaceEjs',
        done);
});
gulp.task('default', ['lessWithOutCompress'], function () {
    gulp.watch(config.less, ['dev']);
});
gulp.task('release', function (done) {
    runSequence(
        'js',
        'less',
        'img',
        'mainFest',
        'replaceCss',
        'replaceEjs',
        done);
});