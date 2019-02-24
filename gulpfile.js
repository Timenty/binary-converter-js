var gulp            = require('gulp'),
	stylus          = require('gulp-stylus'),
	plumber         = require('gulp-plumber'),
	browserSync     = require('browser-sync').create(),
	del             = require('del'),
	concat          = require('gulp-concat'),
	pug             = require('gulp-pug'),
	sourcemaps      = require('gulp-sourcemaps'),
	uglify          = require('gulp-uglify'),
	uglify          = require('gulp-uglify-es').default,
	autoprefixer    = require('gulp-autoprefixer'),
	notify          = require('gulp-notify'),
	cleanCSS        = require('gulp-clean-css'),
	// cssmin			= require('gulp-cssmin'),
	gulpPugBeautify = require('gulp-pug-beautify'),
	// babel 			= require('gulp-babel');
	reload          = browserSync.reload;

// pug отключен
// destination folder
var src  = 'static/';
var dest = 'public_html/';

// error handler function
var onError = function (error) {
  notify({
	title: 'Task Failed [' + error.plugin + ']',
	message:  error.toString(),
  }).write(error);
  console.error(error.toString());
  this.emit('end');
};

var src_paths = {
	stylus: src + 'stylus/**/[^_]*.styl',
	pug: src + 'pug/**/[^_]*.pug',
	js: src + 'js/**/*.js',
};

var watch_paths = {
	stylus: src + 'stylus/**/*.styl',
	js: src + 'js/**/*.js',
	pug: src + 'pug/**/*.pug',
};

gulp.task('stylus', function() {
	return gulp.src(src_paths.stylus)         // get source paths from array above
	.pipe(sourcemaps.init())                                // helps connect source files and production files
	.pipe(plumber({errorHandler: onError})) // prevents gulp.watch from crashing, finds errors in stream
	.pipe(stylus())
	.pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(autoprefixer({
    	browsers: ['last 5 versions'],
    	cascade: true
    }))
	.pipe(cleanCSS({compatibility: '10', level : {
		2 : {
			all :  true ,
			removeDuplicateRules : true,
		}
	}}))
	.pipe(sourcemaps.write('../maps'))              // helps connect source files and production files
	.pipe(gulp.dest(dest + 'css'))          // send result to css folder in build
	.pipe(browserSync.reload({stream: true, match: '**/*.css'}))
});


// Всё PUG отключен, правки вносить в .php
gulp.task('pug', function() {
	return gulp.src(src_paths.pug)
	.pipe(sourcemaps.init())
	.pipe(plumber({errorHandler: onError})) // plumber finds errors in stream
	.pipe(pug({pretty: true,}))
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulpPugBeautify({ omit_empty: true, fill_tab: true, tab_size: 4 }))
	.pipe(gulp.dest(dest + 'html'))
});

gulp.task('js', function() {
	return gulp.src(src_paths.js)
	.pipe(sourcemaps.init())
	.pipe(plumber({errorHandler: onError})) // plumber finds errors in stream
	.pipe(concat('all.min.js'))
	.pipe(sourcemaps.init({ loadMaps: true }))
	.pipe(uglify())
	.pipe(sourcemaps.write('../maps'))
	.pipe(gulp.dest(dest + 'js'))
});



// gulp.task('watch', function() {
// 	gulp.watch(watch_paths.stylus, gulp.series('stylus'));
// 	// gulp.watch(src_paths.js, ['js']);
// });


// // Clean
// gulp.task('clean', function () {
// 	return del.sync([ dest + '/html', dest + '/css',  dest + '/js'], { read: false });
// });

gulp.task('default', gulp.series('js', 'stylus', 'pug', function () {
// gulp.task('default', gulp.series('js','stylus', function () {

	browserSync.init({
		startPath: 'html',
		server: {
		baseDir: './public_html/',
	},
		notify: false
	});


	gulp.watch(watch_paths.stylus, gulp.series('stylus'));
	gulp.watch(watch_paths.js, gulp.series('js', function(done){
		browserSync.reload();
		done();
	}));
	gulp.watch(watch_paths.pug,    gulp.series('pug', function(done){
		browserSync.reload();
		done();
	}));

}));

