var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('default', ['sass', 'scripts', 'sass-mobile']);

gulp.task('sass', function () {
  return gulp.src(['./sass/reusables/*.scss', './sass/pages/*.scss', './sass/globals/*.scss'])
    .pipe(concat('bundle.min.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('sass-mobile', function () {
  return gulp.src(['./sass/reusables/*.scss', './sass/mobile/*.scss'])
    .pipe(concat('mobile.min.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('scripts', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify({
      mangle: false
    }))
    .pipe(gulp.dest('./public/js'));
});
