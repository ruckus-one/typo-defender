var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify'),
    fs = require('fs'),
    insert = require('gulp-insert');


gulp.task('default', function() {
    gutil.log('Just building your amazing game together... [he paid me for saying that]');

    gulp.src(['src/game.html'])
        .pipe(gp_rename('index.html'))
        .pipe(gulp.dest('dist'));

    gulp.src(['src/resources/**/*'])
        .pipe(gulp.dest('dist/resources'));

    var pkg = JSON.parse(fs.readFileSync('./package.json'));

    return gulp.src(['src/Main.js', 'src/*.js'])
        .pipe(gp_concat('game.min.js'))
        .pipe(gp_uglify())
        .pipe(insert.prepend('/** '+pkg.name+' v'+pkg.version+' by '+pkg.author+' **/'))
        .pipe(gulp.dest('dist'));
});
