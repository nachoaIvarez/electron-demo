import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

// SASS
gulp.task('sass', () => {
  return gulp.src('scss/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['scss']
    }).on('error', $.sass.logError))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
  gulp.watch('**/*.scss', ['sass']);
});
