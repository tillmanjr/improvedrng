const Random = require("random-js").Random;
const {nodeCrypto} = require("random-js")
const { run } = require('./simplistic');
const {
    n,
    y
} = require('./runConsts');

const random = new Random(nodeCrypto);

const title = 'Node Crypto RNG with random-js'
run(random, title, y, n);