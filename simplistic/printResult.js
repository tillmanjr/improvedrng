function StandardDeviation(arr) {
 
    // Creating the mean with Array.reduce
    let mean = arr.reduce((acc, curr) => {
        return acc + curr
    }, 0) / arr.length;
 
    // Assigning (value - mean) ^ 2 to
    // every array item
    arr = arr.map((k) => {
        return (k - mean) ** 2
    });
 
    // Calculating the sum of updated array 
    let sum = arr.reduce((acc, curr) => acc + curr, 0);
 
    // Calculating the variance
    let variance = sum / arr.length
 
    // Returning the standard deviation
    return Math.sqrt(sum / arr.length)
}
const printResult = (result, title, n, y) => {
    const perfect = n * y / 20
    const min = Math.min(...result);
    const max = Math.max(...result);
    const std = StandardDeviation(result);
    const subTitle = `Roll ${y} sets of ${n} D20`

    const output = result.map((value, index) => {
        const prefix = index < 9 ? ' ' : '';
        const total = `${prefix}${index + 1}\t\t${value}`
        let suffix = value === min
            ? ' <-- Min'
            : value === max
                ? ' <------- Max'
                : '';
        return `${total}${suffix}`;
    });
    
    console.log(title);
    console.log(subTitle);
    console.log(`Min: ${min}    Max: ${max}\t\tStandard Deviation`);
    console.log(`     ${min-perfect}         +${max-perfect}\t\t\t${std}`);
    console.log('')
    console.log('Face\tCount')
    console.log(output.join('\n'));
}

module.exports = {
    printResult
}