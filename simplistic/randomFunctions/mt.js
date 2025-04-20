const Random = require("random-js").Random;
const {MersenneTwister19937} = require("random-js")

const random = new Random(MersenneTwister19937.autoSeed());
const title = 'Mersenne Twister 19937 with random-js'

module.exports = {
    title,
    randomFn: random
}