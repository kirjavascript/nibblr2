const { watch } = require('chokidar');
const { readFile } = require('fs').promises;
const path = require('path');
const initial = require('../config.json');
const configPath = path.join(__dirname, '../config.json');

const reload = async () => {
    try {
        return JSON.parse(await readFile(configPath))
    } catch (e) {
        console.error(`problem reading config file: ${e.message}`);
    }
};

function patch() {

}

// if (key === "password") return value.replace(/./g, '*')

watch(configPath)
    .on('change', () => {
        patch(config, reload());
    });


module.exports = () => {
    const store = {
        test: true
    };
    const path = [store];

    const ctx = (local, path = []) => {

        return {
            ctx,
            get,
        };
    };

    const getContext = (ctx, store) => {

        return {
            ctx: () => {
            },
            root: () => {
            },
            get: () => {
            },

        };
    };



    return { get, ctx };

    // config.ctx('servers').ctx('3')

    // inheritance
    // data sanitization
    // computed values

    // get all set sudo
    // isSudo check
    // config.safe()
    // config.onChange
    // .bindGetter()

    // map array methods? object methods?
    // -> set a new root node / channel / server
    //
    // .getBase
};

const config = module.exports();


console.log(config.get())
