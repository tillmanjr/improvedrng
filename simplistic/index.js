const { startProcessing } = require('./utils/processor')

const runParams = {
    n: 1000,
    y: 1000,
    include: {
        mersenneTwister: true,
        nativeMath: true,
        nodeCrypto: true,
        vanilla: true
    }
}



startProcessing(runParams)