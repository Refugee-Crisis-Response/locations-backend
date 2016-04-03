import gulp from 'gulp';
import tape from 'gulp-tape';
import tapSpec from 'tap-spec';

gulp.task('test', () => {
  return gulp.src('test/**/*.test.js')
    .pipe(tape({
      reporter: faucet()
    }));
});

gulp.task('test-unit', () => {
  return gulp.src('test/unit/**/*.test.js')
    .pipe(tape({
      reporter: tapSpec()
    }));
});
