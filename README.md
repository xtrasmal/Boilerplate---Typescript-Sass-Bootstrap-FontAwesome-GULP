# Boilerplate (Gulp). Includes a base HTML5 page and builders for Typescript, Sass, Bootstrap and Font Awesome.

Assume Node and Gulp already globally installed.
Get a copy of this repo and then in the root:

 ```sh
$ npm install
$ cd toolkit
$ npm install
$ gulp vendor (this copies required scripts from /src/vendor.js once. If you add a new vendor script, just run it again)
$ gulp (this will copy everything to the /develop folder and starts watching)
```

# Still to be done

Make a release (or production) gulp script that also minifies/uglifies and does more packaging.