var ghPages = require('gulp-gh-pages');
var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');

gulp.task('deploy', function() {
  return gulp.src('./docs/**/*')
    .pipe(ghPages());
});

gulp.task('jsdoc', function () {
  return gulp.src(["./lib/**/*.js", "README.md"])
    .pipe(jsdoc('./docs'));
});
