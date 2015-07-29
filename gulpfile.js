var gulp = require('gulp');
var jsdoc = require('gulp-jsdoc');

gulp.task('jsdoc', function () {
  gulp.src(["./lib/**/*.js", "README.md"])
    .pipe(jsdoc('./docs'));
});
