/**
 * Created by gabriel.rohden on 12/12/2016.
 */
var gulp        = require('gulp');
var gulpUtil    = require('gulp-util');
var uglify      = require('gulp-uglify');
var watch       = require('gulp-watch');
var concat      = require('gulp-concat');
var embededTemplates = require('gulp-angular-embed-templates');


gulp.task('minify', function () {
    return gulp
        .src([
            './src/configurations.module.js',
            './src/configurations.controller.js',
            './src/configurations.directive.js',
            './src/configurations.service.js',
            './src/option.directive.js',
            './src/persist.directive.js'
        ])
        .pipe(embededTemplates())
        .pipe(concat('grConfigurationsPersister.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/'))
});

gulp.task('concat', function () {
    return gulp
        .src([
            './src/configurations.module.js',
            './src/configurations.controller.js',
            './src/configurations.directive.js',
            './src/configurations.service.js',
            './src/option.directive.js',
            './src/persist.directive.js'
        ])
        .pipe(embededTemplates())
        .pipe(concat('grConfigurationsPersister.concated.js'))
        .pipe(gulp.dest('build/'))
});

gulp.task('watch',function () {
    gulp.watch('src/*.js',function(event){
        gulpUtil.log(`File ${event.path} was ${event.type}, running tasks..`);
        gulp.run('minify');
    });
});

gulp.task('watchConcat',function () {
    gulp.watch('src/*.js',function(event){
        gulpUtil.log(`File ${event.path} was ${event.type}, running tasks..`);
        gulp.run('concat');
    });
});