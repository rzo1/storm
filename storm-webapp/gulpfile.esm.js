import {src, dest, series, parallel} from "gulp";
import {styles, scripts, vendorScripts, vendorStyles, vendorTopScripts} from "./bundle.config";
import babel from "gulp-babel";
import cleanCSS from 'gulp-clean-css';
import concat from "gulp-concat";
import del from "del";
import uglify from "gulp-uglify";

export const clean = () =>
    del(["./src/main/java/org/apache/storm/daemon/ui/WEB-INF/public"]);

export const css = () =>
    src(styles)
        .pipe(cleanCSS())
        .pipe(concat("main.css"))
        .pipe(dest("./src/main/java/org/apache/storm/daemon/ui/WEB-INF/public"));

export const vendorCss = () =>
    src(vendorStyles)
        .pipe(cleanCSS())
        .pipe(concat("vendor.css"))
        .pipe(dest("./src/main/java/org/apache/storm/daemon/ui/WEB-INF/public"));

export const js = () =>
    src(scripts)
        .pipe(babel())
        .pipe(uglify())
        .pipe(concat("main.js"))
        .pipe(dest("./src/main/java/org/apache/storm/daemon/ui/WEB-INF/public"));

export const vendorJs = () =>
    src(vendorScripts)
        .pipe(uglify())
        .pipe(concat("vendor.js"))
        .pipe(dest("./src/main/java/org/apache/storm/daemon/ui/WEB-INF/public"));

export const vendorTopJs = () =>
    src(vendorTopScripts)
        .pipe(uglify())
        .pipe(concat("vendor-top.js"))
        .pipe(dest("./src/main/java/org/apache/storm/daemon/ui/WEB-INF/public"));

export const bundle = series(clean, parallel(css, vendorCss, js, vendorJs, vendorTopJs));
