const Random = require("random-js").Random;
const {nativeMath} = require("random-js")

const { run } = require('./simplistic')
const {
    n,
    y
} = require('./runConsts');

const random = new Random(nativeMath)

const title = 'Native Math.random with random-js'

run(random, title, y, n)