class random {
    static integer(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
const title = 'Native "vanilla" JS Math.random()'

module.exports = {
    title,
    randomFn: random
}