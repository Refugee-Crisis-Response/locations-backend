import gulp from 'gulp';
import tape from 'gulp-tape';
import faucet from 'faucet';

gulp.task('test', () => {
  return gulp.src('test/**/*.test.js')
    .pipe(tape({
      reporter: faucet()
    }));
});

gulp.task('test-unit', () => {
  return gulp.src('test/unit/**/*.test.js')
    .pipe(tape({
      reporter: faucet()
    }));
});
