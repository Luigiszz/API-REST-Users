import { Readable } from "node:stream";

class OneToOneHundred extends Readable {
  index = 0;
  _read() {
    setTimeout(() => {
      this.index++;

      if (this.index > 5) {
        this.push(null);
      } else {
        this.push(Buffer.from(String(this.index)));
      }
    }, 1000);
  }
}

fetch("http://localhost:3335", {
  method: "POST",
  body: new OneToOneHundred(),
  duplex: "half",
});
