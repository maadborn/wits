import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import project from '../aurelia.json';
//import {build} from 'aurelia-cli';

 // Added for static access
export default function processCSSStatic() {
  return gulp.src(project.cssProcessor.source)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(`${project.platform.output}`));
}
