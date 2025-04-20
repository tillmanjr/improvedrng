const { run } = require('./randomFunctionProcessor')
const {
    title: mtTitle,
    randomFn: mtRandom
} = require('../randomFunctions/mt')
const {
    title: nativeTitle,
    randomFn: nativeRandom
} = require('../randomFunctions/nativeMath')
const {
    title: nCryptoTitle,
    randomFn: nCryptoRandom
} = require('../randomFunctions/nodeCrypto')
const {
    title: vanillaTitle,
    randomFn: vanillaRandom
} = require('../randomFunctions/vanilla')

const startProcessing = (runParams) => {
    // const n = runParams.n
    // const y = runParams.y
    const {
        n,
        y,
        include
    } = runParams
    const {
        mersenneTwister: includeMersenneTwister,
        nativeMath: includeNativeMath,
        nodeCrypto: includeNodeCrypto,
        vanilla: includeVanilla
    } = include

    // const includeMersenneTwister = runParams.include.mersenneTwister
    // const includeNativeMath = runParams.include.nativeMath
    // const includeNodeCrypto = runParams.include.nodeCrypto
    // const includeVanilla = runParams.include.vanilla

    const tasks = []
    if (includeMersenneTwister) { tasks.push( [mtRandom, mtTitle]) }
    if (includeNativeMath) { tasks.push( [nativeRandom, nativeTitle]) }
    if (includeNodeCrypto) { tasks.push( [nCryptoRandom, nCryptoTitle]) }
    if (includeVanilla) { tasks.push( [vanillaRandom, vanillaTitle]) }

    if (tasks.length <= 0) {
        console.log('No tasks to run')
        return
    }
    tasks.forEach((taskItem)=> {
        run(taskItem[0], taskItem[1], n, y)
    })
}

module.exports = {
    startProcessing
}