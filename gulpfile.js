var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');

gulp.task('default', function() {
    gutil.log('Just building your amazing game together... [he paid me for saying that]');

    gulp.src(['src/index.html'])
        .pipe(gulp.dest('dist'));

    gulp.src(['src/resources/**/*'])
        .pipe(gulp.dest('dist/resources'));

    return gulp.src(['src/*.js'])
        .pipe(gp_concat('game.min.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('dist'));
});