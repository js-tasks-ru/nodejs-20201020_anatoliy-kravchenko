var sum = (...args) => {
    // try {
        if (!args.length) throw TypeError('TypeError');
        return args.reduce((cur, sum) => {
            if (args.length < 2 || typeof cur !== 'number' || typeof sum !== 'number') throw TypeError('TypeError')
            return cur + sum
        }, 0);
    // } catch (e) {
    //     console.warn(e)
    // }
}

module.exports = sum;
