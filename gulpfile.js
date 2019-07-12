var gulp = require('gulp');
var webserver = require('gulp-webserver');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var sassGlob = require('gulp-sass-glob');
var livereload = require('gulp-livereload');
var image = require('gulp-image');
var clean = require('gulp-dest-clean');
//var jsonminify = require('gulp-jsonminify');
var spritesmith = require('gulp.spritesmith');
var mergeStream =   require('merge-stream');



var src = 'src';
var dist = 'dist';

var paths = {
	js: src + '/js/**/*.js',
	jsLib: src + '/js/lib/*.js',
	json: src + '/json/*.json',
	scss: src + '/scss/**/*.scss',
	scssLib: src + '/scss/lib/*.*',
	html: src + '/**/*.html',
	img: src + '/img/**/*.*',
	spriteImages: src + '/img-sprites/*.png'
};

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function () {
	return gulp.src(dist + '/')
		.pipe(webserver({
			livereload: true,
			open: true
		}));
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
	return gulp.src([paths.js, paths.jsLib])
		//.pipe(concat('script.js'))		//concat: 파일명 지정
		.pipe(clean(dist + '/js/'))
		//.pipe(uglify())
		.pipe(gulp.dest(dist + '/js/')); //dest: 경로지정
});

// sass 파일을 css 로 컴파일한다.
gulp.task('compile-sass', function () {
	return gulp.src([paths.scss, paths.scssLib])
		//.pipe(sassGlob())	//use glob imports
		.pipe(clean(dist + '/css/'))
		.pipe(sass().on('error', sass.logError))
		//.pipe(concat('launcher_2019.css'))
		.pipe(gulp.dest(dist + '/css/'));
});
gulp.task('sass:watch', function(){
    gulp.watch(paths.scss, ['sass']);
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
	return gulp.src(paths.html)
		//.pipe(minifyhtml())
		.pipe(gulp.dest(dist + '/'));
});

// Image 최적화
gulp.task('image', function () {
	return gulp.src(paths.img)
		.pipe(clean(dist + '/img/'))
		//.pipe(newer(dist + '/img'))
		.pipe(image())
		.pipe(gulp.dest(dist + '/img/'));
});

// json
gulp.task('minify', function () {
    return gulp.src(paths.json)
		.pipe(clean(dist + '/json/'))
        .pipe(jsonminify())
        .pipe(gulp.dest(dist + '/json/'));
});
 
// 이미지 스프라이트
gulp.task('sprite', function(){
    var spriteData = gulp.src(paths.spriteImages)
    .pipe(spritesmith({
        imgName: 'sprite.png',
        padding: 10,	// 이미지 사이의 패딩
        cssName: 'sprite.scss',
		imgPath: '/img-sprite/sprite.png'
		//algorithm: 'left-right'	//가로로
    }));
    var imgStream = spriteData.img.pipe(gulp.dest(dist + '/img-sprite/')).on('error', function (err) {
		console.log(err)
    });
	var cssStream = spriteData.css.pipe(gulp.dest(src + '/scss')).on('error', function (err) {
		console.log(err)
    });
	return mergeStream(imgStream, cssStream);
});

// 파일 변경 감지 및 브라우저 재시작
gulp.task('watch', function () {
	gulp.watch(paths.js, gulp.series( 'combine-js'));
	gulp.watch(paths.spriteImages, gulp.series('sprite'));
	gulp.watch(paths.scss, gulp.task('compile-sass'));
	gulp.watch(paths.html, gulp.series( 'compress-html'));
	//gulp.watch(paths.img, gulp.series( 'minify'));
	gulp.watch(paths.img, gulp.series( 'image'));
	gulp.watch(dist + '/**').on('change', livereload.changed);
	livereload.listen();
});

// build
gulp.task('build', gulp.series(
	/*'server',*/ 'sprite', 'combine-js', 'compile-sass', 'compress-html', 'image' ));

// 기본 task 설정
gulp.task('default', gulp.series(
	'server', /*'combine-js', 'compile-sass', 'compress-html', 'image',*/  'sprite', 'watch' ));
