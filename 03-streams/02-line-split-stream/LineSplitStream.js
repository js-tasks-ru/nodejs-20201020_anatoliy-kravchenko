const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.line = '';
  }

  _transform(chunk, encoding, callback) {
    this.line = chunk.toString().split('').reduce((accum, cur) => {
      if (cur === os.EOL) {
        this.push(accum);
        return '';
      }
      return accum.concat(cur);
    }, this.line);
    callback();
  }

  _flush(callback) {
    callback(null, this.line);
  }
}

module.exports = LineSplitStream;

// const lineSplitStream = new LineSplitStream({encoding: 'utf-8'});
//
// lineSplitStream.on('data', (chunk) => {
//   console.log('line: ', chunk);
// });
//
// // lineSplitStream.write(['a', 'b', 'c', 'd', 'e', 'f'].join(os.EOL));
// lineSplitStream.write('line1\nline2');
// lineSplitStream.write('line3\n');
// lineSplitStream.write('line4');
// lineSplitStream.write('line5\n');
// lineSplitStream.write('lin');
// lineSplitStream.write('e6');

// lineSplitStream.write('world');
// lineSplitStream.end();
