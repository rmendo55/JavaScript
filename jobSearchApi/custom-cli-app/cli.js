//CLI using yargs for search command
//allow user to type the keyword when running js file
const yargs = require('yargs');//yargs API is used to parse arguments
const app = require('./app.js');

yargs
    .usage('$0: Usage <cmd> [options]')
    // add the 'draw' command
    .command({
        command: 'search',
        desc: 'Search a Job Title',
        builder: yargs => {
            // add options (shuffle and count) to the draw command these options
            return yargs
                .options('k', {
                    alias: 'keyword',
                    describe: 'search keyword specified',
                })
        },
        handler: argv => {
            app.searchKeyword(argv.keyword);
        }
    })
    // add a help menu to assist the user in understanding our CLI
    .help('help').argv;