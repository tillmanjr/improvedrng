const Random = require("random-js").Random;
const {MersenneTwister19937} = require("random-js")
const {run} = require('./simplistic')

const random = new Random(MersenneTwister19937.autoSeed());

const n = 1000;
const y = 1000

const title = 'Mersenne Twister 19937 with random-js'
run(random, title, n, y);