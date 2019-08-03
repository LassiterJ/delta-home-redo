const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const bootlint = require("gulp-bootlint");

// Compile bootstrap sass into CSS & auto-inject into browsers GULP 4
// *************  NEED TO REFACTOR TO COMBINE STYLES TO SAME FUNCTION**********
// *************                 AS WELL AS SCRIPTS                  **********
// function style(){
//     const styleB = ["node_modules/bootstrap/scss/bootstrap.scss",
//     "src/scss/bootstrap/**/*.scss"];
//     const styleG = "src/scss/css-grid/**/*.scss";
//     const styleArr = [styleB, styleG];
//     for(let i = 0; i<styleArr.length; i++){
//         console.log("style src: ", styleArr[i])
//         return (
//             gulp
//               .src(styleArr[i])
//               // 2. Pass file through sass compiler
//               .pipe(sass().on("error", sass.logError))
//               // 3. Where do I save the compiled css?
//               .pipe(gulp.dest("src/css"))
//               // 4. stream changes to all browsers
//               .pipe(browserSync.stream())
//           );
//     }};

function blint() {
  return gulp.src("src/index.html").pipe(
    bootlint({
      stoponerror: true,
      stoponwarning: true,
      loglevel: "debug",
      disabledIds: ['E013'],
      issues:[],
  
    })
  );
}

function styleB() {
  // 1. Find scss file
  return (
    gulp
      .src(
        "src/scss/bootstrap/**/*.scss"
      )
      // 2. Pass file through sass compiler
      .pipe(sass().on("error", sass.logError))
      // 3. Where do I save the compiled css?
      .pipe(gulp.dest("src/css"))
      // 4. stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

// Compile css-grid sass into CSS & auto-inject into browsers GULP 4

function styleG() {
  // 1. Find scss file
  return (
    gulp
      .src("src/scss/css-grid/**/*.scss")
      // 2. Pass file through sass compiler
      .pipe(sass().on("error", sass.logError))
      // 3. Where do I save the compiled css?
      .pipe(gulp.dest("src/css"))
      // 4. stream changes to all browsers
      .pipe(browserSync.stream())
  );
}

// Inject JS into browsers
function jsB() {
  return gulp
    .src([
      "node_modules/bootstrap/dist/js/bootstrap.min.js",
      "node_modules/jquery/dist/jquery.min.js",
      "node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("src/js/bootstrap"))
    .pipe(browserSync.stream());
}

function jsG() {
  return gulp
    .src("node_modules/jquery/dist/jquery.js")
    .pipe(gulp.dest("src/js/cssGrid"))
    .pipe(browserSync.stream());
}

// Watch for changes and update browsers automatically
function watch() {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });

  gulp.watch(
    
      
      "src/scss/bootstrap/**/*.scss"
    ,
    styleB
  );
  gulp.watch("src/scss/css-grid/**/*.scss", styleG);
  gulp
    .watch(["src/*.html", "src/assets/**/*.html"])
    .on("change", browserSync.reload);
  gulp
    .watch(
      [
        "node_modules/bootstrap/dist/js/bootstrap.min.js",
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/popper.js/dist/umd/popper.min.js"
      ],
      jsB
    )
    .on("change", browserSync.reload);
  gulp.watch(["/js/cssGrid/*.js"], jsG).on("change", browserSync.reload);
}

// Combine all tasks and run
function run() {
  return gulp.series(blint, jsB, jsG, gulp.parallel(styleB, styleG, watch));
}

const build = run();
exports.build = build;
exports.default = build;

// Compile bootstrap sass into CSS & auto-inject into browsers

// gulp.task("sassB", function() {
//   return gulp
//     .src([
//       "node_modules/bootstrap/scss/bootstrap.scss",
//       "src/scss/bootstrap-styles.scss"
//     ])
//     .pipe(sass())
//     .pipe(gulp.dest("src/css"))
//     .pipe(browserSync.stream());
// });

// // Compile grid-sass into CSS & auto-inject into browsers
// gulp.task("sassG", function() {
//   return gulp
//     .src(["src/scss/grid-styles.scss"])
//     .pipe(sass())
//     .pipe(gulp.dest("src/css"))
//     .pipe(browserSync.stream());
// });

// // Move the javascript files into our /src/js folder
// gulp.task("js", function() {
//   return gulp
//     .src([
//       "node_modules/bootstrap/dist/js/bootstrap.min.js",
//       "node_modules/jquery/dist/jquery.min.js",
//       "node_modules/popper.js/dist/umd/popper.min.js"
//     ])
//     .pipe(gulp.dest("src/js"))
//     .pipe(browserSync.stream());
// });

// // Static Server + watching scss/html files
// gulp.task(
//   "serveB",
//   gulp.series("sassB", function() {
//     browserSync.init({
//       server: "./src"
//     });
//   })
// );
// gulp.task(
//   "serveG",
//   gulp.series("sassG", function() {
//     browserSync.init({
//       server: "./src"
//     });
//   })
// );

// gulp.watch(
//   [
//     "node_modules/bootstrap/scss/bootstrap.scss",
//     "src/scss/bootstrap-styles.scss"
//   ,
//   gulp.series("sassB")
//   ]);

// gulp.watch(["src/scss/gulp-styles.scss", gulp.series("sassG")]);
// gulp.watch("src/*.html").on("change", browserSync.reload);

// gulp.task("default", gulp.parallel("js", "serveB", "serveG"));
