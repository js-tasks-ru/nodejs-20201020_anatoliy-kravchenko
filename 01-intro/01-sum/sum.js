function sum(a, b) {
    try {
        return args.reduce((cur, sum) => {
            if(typeof cur !== 'number' || typeof sum !== 'number') throw TypeError('TypeError')
            return cur + sum
        },0);
    } catch(e) {
        console.warn(e)
    }
}

module.exports = sum;
