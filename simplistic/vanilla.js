const { run } = require('./simplistic');
const {
    n,
    y
} = require('./runConsts');

class random {
    static integer(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}


const title = 'Native JS Math.random()'
run(random, title, n, y);