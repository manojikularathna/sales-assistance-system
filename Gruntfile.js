/**
 * Grunt File for SASS to CSS and to minifying HTML, CSS and JS
 *    Include Options
 *    1. SASS to CSS
 *    2. Grunt Watch
 *    3. Auto Pre Fixer
 *    4. CSS Minify
 *    5. HTML Minify
 *    6. JS Minify
 * File Developed by Kavidu Hettiarachchi - Customized and Updated by Thilini Liyanaarachchi
 *
 *    Below are the steps to config the environment ( This is an one-time setup )
 *    1. Install node.js ( https://nodejs.org/dist/v8.11.2/node-v8.11.2-x64.msi )
 *    After finishing installing Node.js run this command in your command prompt | npm -v ( If node is installed correctly, you can see the node.js running version. If not reboot your computer and run previous command again. )
 *    2. Next install ruby ( https://github.com/oneclick/rubyinstaller2/releases/download/rubyinstaller-2.4.4-1/rubyinstaller-devkit-2.4.4-1-x64.exe )
 *    After finishing installing Ruby run this command in your command prompt | ruby -v ( If Ruby is installed correctly, you can see the ruby running version. If not reboot your computer and run previous command again. )
 *    3. Once you have completed step 1 and 2 install grunt to your computer by using this command | npm install -g grunt-cli
 *    After you finished your grunt installation, you can check the grunt status by using this command | npm grunt-compass --version
 *    4. Setup sass to css configuration environment.
 *    sass is running inside ruby so you have to install sass gem for support sass to css converter. Run this command to install sass support gem | gem install sass (If https not working follow this step | gem sources --remove https://rubygems.org/ | gem sources -a http://rubygems.org)
 *
 *    Now your sass to css convert environment is ready. So you can compile sass files to css.
 *
 *    Create new project.
 *    Copy this file(Grunt.js) to your project(root) folder. ( Do this everytime you start a fresh project)
 *    Before you start coding, run below commands to config sass to css | minimize css | minimize javascript | minimize html.
 *    1. npm init - (when you run this command it will automatically make package.json file and it will prompt some questions for you to answer.)
 *    2. npm install grunt --save-dev
 *    3. npm install grunt-contrib-sass --save-dev
 *    4. npm install grunt-contrib-watch --save-dev
 *    5. npm install grunt-autoprefixer --save-dev
 *    6. npm install grunt-contrib-cssmin --save-dev
 *    7. npm install grunt-contrib-htmlmin --save-dev
 *    8. npm install grunt-contrib-uglify --save-dev
 *    9. Change your file names and folder paths accordingly.
 *
 *    Enjoy with SASS to CSS
 **/
module.exports = function (grunt) {
    grunt.initConfig({
        /**
         *Project information json
         **/
        pkg: grunt.file.readJSON('package.json'),
        /**
         * SASS to CSS
         **/
        sass: {                                 // Task
            dist: {                             // Target
                options: {                      // Target options
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {                                             // Dictionary of files
                    'src/css/styles.css': 'src/sass/styles.scss'     // 'destination': 'source'
                }
            }
        },
        /**
         * CSS Auto Pre fixer
         **/
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'Android 4', 'iOS 6']
            },
            dist: {
                files: {'src/css/styles.css': 'src/css/styles.css'}
            }
        },
        /**
         * CSS Expand to CSS Minify ( Before upload live server or development server run this command | grunt build | you can get css Minifyed css version to upload. )
         **/
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css/',
                    src: ['styles.css'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            }
        },
        /**
         * HTML Expand to HTML Minify
         **/
        htmlmin: {                                     // Task
            dist: {                                      // Target
                options: {                                 // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {                                   // Dictionary of files
                    'views/dashboard-view.php': 'src/html/dashboard-view.php'
                }
            }
        },
        /**
         * JS Expand to JS Minify
         **/
        uglify : {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: '**/*.js',
                    dest: 'assets/js',
                    ext: '.min.js'
                }]
            }
        },
        /**
         * Grunt Watch ( When you Start development run this command to get sass to css file out | grunt )
         **/
        watch: {
            css: {
                files: ['**/*.scss','src/html/*.php', 'src/js/*.js'],
                tasks: ['build'],
                options: {
                    spawn: false,
                    livereload: true
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['sass', 'autoprefixer', 'cssmin', 'htmlmin', 'uglify']);
}