var argv = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var del = require('del');
var gulp = require('gulp');
var gnewer = require('gulp-newer');
var gutil = require('gulp-util');
//var imagemin = require('gulp-imagemin');
var minifyCSS = require('gulp-minify-css');
var path = require('path');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var webpack = require('webpack');

var RELEASE_MODE = argv.release || false;

var paths = Object.create({
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  watch: {
    scripts: path.join(__dirname, 'src', 'scripts/**/*'),
    html: path.join(__dirname, 'src', '**/*.html'),
    data: path.join(__dirname, 'src', 'data/**/*'),
    images: path.join(__dirname, 'src', 'images/**/*'),
    sass: path.join(__dirname, 'src', 'styles/**/*.scss')
  }
});


gulp.task('webpack', [], function () {
  var srcScripts = path.join(paths.src, 'scripts');
  var distScripts = path.join(paths.dist, 'scripts');
  var watch = true;

  var plugins = [
    new webpack.optimize.CommonsChunkPlugin('commons.js'),
    new webpack.NoErrorsPlugin()
  ];

  if (RELEASE_MODE) {
    watch = false;
    plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.NoErrorsPlugin()
    );
  }

  webpack({
      node: {
        fs: 'empty'
      },
      watch: watch,
      devtool: 'source-map',
      entry: {
        index: path.join(srcScripts, 'index.js')
        //index2: path.join(srcScripts, 'index2.js')
      },
      output: {
        path: path.join(distScripts),
        filename: '[name].js',
        sourceMapFilename: '[file].map'
      },
      plugins: plugins,
      module: {
        loaders: [
          //{
          //  test: /\.ts$/,
          //  exclude: /node_modules/,
          //  loader: 'typescript-loader?typescriptCompiler=jsx-typescript'
          //},
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel-loader']
          },
          {
            test: /\.js$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
          }
        ]
      },
      resolve: {
        extensions: ['', '.ts', '.js', '.jsx']
      }
    },
    function (err, stats) {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      browserSync.reload();
      gutil.log('[webpack]', stats.toString({
        chunks: false
      }));
    });

});


gulp.task('sass', function () {
  gulp.src(paths.watch.sass)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(minifyCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.join(paths.dist, 'styles')));
});


gulp.task('html', function () {
  gulp.src(paths.watch.html)
    .pipe(plumber())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', function () {
  var imageDest = path.join(paths.dist, 'images');
  gulp.src(paths.watch.images)
    .pipe(gnewer(imageDest))
    //.pipe(imagemin())
    .pipe(gulp.dest(imageDest));
});

gulp.task('data', function () {
  gulp.src(paths.watch.data)
    .pipe(plumber())
    .pipe(gulp.dest(path.join(paths.dist, 'data')));
});


gulp.task('watch', function () {
  gulp.watch(paths.watch.html, ['html']).on('change', browserSync.reload);
  gulp.watch(paths.watch.html, ['data']).on('change', browserSync.reload);
  gulp.watch(paths.watch.sass, ['sass']).on('change', browserSync.reload);
  gulp.watch(paths.watch.images, ['images']).on('change', browserSync.reload);
});


gulp.task('clean', function (cb) {
  del([paths.dist], cb);
});


gulp.task('browser-sync', function () {
  browserSync({
    open: false,
    server: {
      baseDir: paths.dist
    }
  });
});

var gulpDefaultTasks = ['webpack', 'images', 'sass', 'html', 'data'];

if (!RELEASE_MODE) {
  ['watch', 'browser-sync'].forEach(function (item) {
    gulpDefaultTasks.push(item);
  });
}

gulp.task('default', gulpDefaultTasks);
