const Random = require("random-js").Random;
const {nativeMath} = require("random-js")

const random = new Random(nativeMath)
const title = 'Native Math.random with random-js'

module.exports = {
    title,
    randomFn: random
}