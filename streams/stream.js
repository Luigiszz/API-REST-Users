import { Readable, Writable, Transform } from "node:stream";

class OneToOneHundred extends Readable {
  index = 0;
  _read() {
    this.index++;

    if (this.index > 100) {
      this.push(null);
    } else {
      this.push(Buffer.from(String(this.index)));
    }
  }
}

class InverseNumberSignal extends Transform {
  _transform(chunk, enconding, callback) {
    const result = String(Number(chunk.toString()) * -1);
    callback(null, Buffer.from(result));
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(String(chunk)) * 10);
    callback(null);
  }
}

new OneToOneHundred()
  .pipe(new InverseNumberSignal())
  .pipe(new MultiplyByTenStream());
