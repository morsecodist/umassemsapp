var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('default', ['sass', 'scripts', 'sass:watch', 'scripts:watch']);

gulp.task('build', ['sass', 'scripts']);

gulp.task('watch', ['sass:watch', 'scripts:watch']);

gulp.task('sass', function () {
  return gulp.src(['./sass/reusables/*.scss', './sass/pages/*.scss', './sass/components/*.scss', './sass/globals/*.scss'])
    .pipe(concat('bundle.min.css'))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('./public/stylesheets/'));
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

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('scripts:watch', function () {
  gulp.watch('./src/**/*.js', ['scripts']);
});
