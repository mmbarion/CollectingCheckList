var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
//var electron = require('electron-connect').server.create();

var srcDir = 'src';
var compDir = 'app/component';

//jsxファイルのコンパイル
gulp.task('compile',function(){
	return gulp.src('src/**/*.{js,jsx}')
		.pipe($.babel({
			stage:0
		}))
		.pipe(gulp.dest(compDir));
});

//コンパイルしてElectron起動 LiveReload

gulp.task('start',['compile'],function(){
	//electron.start();
	//ファイルが変更されたら再コンパイル
	gulp.watch(srcDir + '/**/*.{js,jsx}',['compile']);
	// BrowserProcessが読み込むファイルが変更されたらRestart。
//	gulp.watch(['main.js'], electron.restart);
	// RendererProcessが読み込むファイルが変更されたらReload。
//	gulp.watch(['index.html', 'app/html/**/*.html','app/style/**/*.css'], electron.reload);
});
