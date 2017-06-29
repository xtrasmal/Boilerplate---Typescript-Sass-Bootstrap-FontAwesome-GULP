const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass');
const include = require('gulp-include');
const yargs = require('yargs');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');

const cliargs = yargs.argv;
const buildpath = cliargs.production ? '../releases/current' : '../develop';

const builders = {
    html: {
        src:    ["../src/*.html"],
        dest:   buildpath
    },
    assets: {
        src:    ["../src/assets/**/*.*"],
        dest:   buildpath+"/assets"
    },
    fonts: {
        src:    ["../node_modules/font-awesome/fonts/*.*"],
        dest:   buildpath+"/fonts"
    },
    vendor: {
        src:    ["../src/vendor/vendor.js"],
        dest:   buildpath+"/script"
    },
    typescript: {
        src:    ["../src/script/**/*.ts"],
        dest:   buildpath+"/script"
    },
    sass: {
        src:    ["../src/sass/**/main.scss"],
        dest:   buildpath+"/css",
        sources: ["../src/sass/**/*.scss"]
    }
}

// VENDOR
gulp.task("vendor", function() {
    console.log('-- gulp is running task vendor');

    const builder = builders.vendor;

    for (var i in builder.src) {
        var src = builder.src[i];
        console.log(builder.dest)
        gulp.src(src)
            .pipe(include())
            .on('error', console.log)
            .pipe(gulp.dest(builder.dest));
    }
});

// ---------- TYPESCRIPT
gulp.task('typescript', function() {
    console.log('-- gulp is running task typescript');

    const builder = builders.typescript;

    for (var i in builder.src) {
        var src = builder.src[i];
        return gulp.src(src)
            .pipe(sourcemaps.init())
            .pipe(ts({
                "noImplicitAny": true,
                "target": "es5",
                "module": "system",
                "moduleResolution": "node",
                "skipDefaultLibCheck": true,
                "sourceMap": true,
                "declaration": false,
                "noUnusedLocals": true,
                "noUnusedParameters": false,
                "noFallthroughCasesInSwitch": true,
                "removeComments": true,
                "suppressImplicitAnyIndexErrors": true,
                "lib": ["es6", "dom"],
                "outFile": "ts.bundle.js"
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(builder.dest))
    }

});

// ---------- SASS
gulp.task('sass', function () {
    console.log('-- gulp is running task sass');
    const builder = builders.sass;

    for (var i in builder.src) {
        var src = builder.src[i];
        return gulp.src(src)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest(builder.dest))
            .pipe(browserSync.stream())
    }
});

// ---------- HTML COPY
gulp.task('html', function () {
    console.log('-- gulp is running task html');
    const builder = builders.html;

    for (var i in builder.src) {
        var src = builder.src[i];
        return gulp.src(src)
            .pipe(gulp.dest(builder.dest))
    }
})

// ---------- ASSETS COPY
gulp.task('assets', function () {
    console.log('-- gulp is running task assets');
    const builder = builders.assets;

    for (var i in builder.src) {
        var src = builder.src[i];
        return gulp.src(src)
            .pipe(gulp.dest(builder.dest))
    }
})

// ---------- FONTS COPY
gulp.task('fonts', function () {
    console.log('-- gulp is running task fonts');
    const builder = builders.fonts;

    for (var i in builder.src) {
        var src = builder.src[i];
        return gulp.src(src)
            .pipe(gulp.dest(builder.dest))
    }
})


// ---------- WATCHERS
gulp.task('default', function(){
    gulp.run('watch');
});

gulp.task('watch', ['html', 'assets', 'sass', 'typescript', 'fonts'], function() {
    browserSync.init({
        server: "../develop"
    });
    gulp.watch(builders.html.src, ['html']).on('change', browserSync.reload);
    gulp.watch(builders.assets.src, ['assets']).on('change', browserSync.reload);
    gulp.watch(builders.sass.sources, ['sass']);
    gulp.watch(builders.typescript.src, ['typescript']).on('change', browserSync.reload);
});
