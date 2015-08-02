var babel = require('gulp-babel');
var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');
var mocha = require('gulp-mocha');
var register = require('babel/register');

gulp.task('build', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('test', function () {
  return gulp.src('test/**/*.js')
    .pipe(
      mocha({
        compilers: {
          js: register
        }
      })
    );
});
