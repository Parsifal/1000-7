import * as https from "https";

const token = "";

class DeadInside {
  private cycle!: NodeJS.Timeout;
  private number = 1000;

  constructor(private readonly token: string, private readonly interval = 2 * 1000) {}

  startStatusChangeCycle() {
    console.log("The cycle has started");
    this.endStatusChangeCycle();
    this.cycle = setInterval(() => {
      if (this.number < 0) this.number = 1000;
      const status = `${this.number} - 7 = ${this.number - 7}`;
      https.get(`https://api.vk.com/method/status.set?text=${status}&access_token=${this.token}&v=5.130`, (response) => {
        if (response.statusCode !== 200) throw new Error("The response code is not 200");
        console.log(`${this.number} - 7 = ${this.number - 7}`);
      });
      this.number -= 7;
    }, this.interval);
  }

  endStatusChangeCycle() {
    clearInterval(this.cycle);
    console.log("Cycle stopped");
  }
}

new DeadInside(token).startStatusChangeCycle();
