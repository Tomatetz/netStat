module.exports = function(grunt) {
    grunt.initConfig({
        less: {
            dist: {
                files: {
                    './styles/main.css' : './styles/main.less'
                }
            }
        },
        uglify: {
            my_target: {
                files: {
                    'scripts/vendors.min.js': ['./bower_components/jquery/dist/jquery.js', './bower_components/bootstrap/dist/js/bootstrap.js',
                        './bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default',[]);

};