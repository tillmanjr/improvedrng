const { printResult } = require('./printResult');

let random = null

function RollND20(n) {
    let rolls = [];
    for (let i = 0; i < n; i++) {
        rolls.push(random.integer(1, 20));
    }
    return rolls;
}

function BinD20Rolls(rolls) {
    let bins = new Array(20).fill(0);
    for (let roll of rolls) {
        bins[roll - 1]++;
    }
    return bins;
}

function CreateRunningBin() {
    return new Array(20).fill(0);
}

function AddBinToRunningBin(runningBin, bin) {
    for (let i = 0; i < 20; i++) {
        runningBin[i] += bin[i];
    }
    return runningBin;
}

function DoNSetsOfYRolls(n, y) {
    let runningBin = CreateRunningBin();
    
    for (let i = 0; i < n; i++) {
        let rolls = RollND20(y);
        let bin = BinD20Rolls(rolls);
        runningBin = AddBinToRunningBin(runningBin, bin);
    }
    return runningBin;
}

function run(randomEngine, title, n, y) {
    random = randomEngine;
    const result = DoNSetsOfYRolls(n, y);
    printResult(result, title, n, y);
}

module.exports = {
    run
}