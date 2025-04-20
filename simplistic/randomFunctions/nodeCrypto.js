const Random = require("random-js").Random;
const {nodeCrypto} = require("random-js")

const random = new Random(nodeCrypto);
const title = 'Node Crypto RNG with random-js'

module.exports = {
    title,
    randomFn: random
}