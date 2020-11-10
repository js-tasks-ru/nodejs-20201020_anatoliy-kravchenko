const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');
const fs = require('fs');

class LimitSizeStream extends stream.Transform {
    constructor({limit, ...options}) {
        super(options);
        this.limit = limit || 16000;
    }

    _transform(chunk, encoding, callback) {
        const data = Buffer.from(chunk),
            size = Buffer.byteLength(data);

        console.log('chunk: ', chunk.toString())
        console.log('chunk size', size);
        console.log('limit: ', this.highWaterMark)
        console.log('readebleLength:', this.readableLength)

        this.limit -= size;

        console.log('eventually limit: ', this.limit)
        console.log('=====================')

        if (this.limit < 0) {
            callback(new LimitExceededError())
        }
        callback(null, chunk)
    }
}

module.exports = LimitSizeStream;

//============Transform=============//
//
// const limitStream = new LimitSizeStream({limit: 10, encoding: 'utf-8',});
// const smile = '😀';

// limitStream.write(smile)
// limitStream.write('ጷ')
// setTimeout(() => limitStream.write('c'), 2000);
// limitStream.write('c');
// limitStream.write('world');
// limitStream.end();

//============Writable==============//
// const writebleStream = fs.createWriteStream('output.txt');
// //
// // writebleStream.on('data', (chunk) => {
// //     console.log('write', chunk)
// // });
// //
// // writebleStream.on('end', () => {
// //     console.log('write end');
// // });
// //
//============Readeble==============//
// // const readebleStream = fs.createReadStream('read.txt', {highWaterMark: 1});
// // readebleStream.on('data', (chunk) => {
// //     console.log('read:', chunk.toString())
// // });
// //
// limitStream.pipe(writebleStream);
