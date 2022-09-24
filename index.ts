import { get } from "https";

const token = "";

class DeadInside {
  private timer?: NodeJS.Timer;
  private number = 1000;
  constructor(
    private readonly token: string,
    private readonly interval = 2 * 1000
  ) {}

  start() {
    this.stop();
    this.createTimer();
    console.log("The cycle has started");
  }

  private createTimer() {
    this.timer = setInterval(() => {
      try {
        if (this.number < 0) this.number = 1000;
        const status = `${this.number} - 7 = ${this.number - 7}`;
        get(
          `https://api.vk.com/method/status.set?text=${status}&access_token=${this.token}&v=5.81`,
          (response) => {
            if (response.statusCode !== 200)
              throw new Error("The response code is not 200");
            console.log(`${this.number} - 7 = ${this.number - 7}`);
          }
        );
        this.number -= 7;
      } catch (e) {
        this.stop();
      }
    }, this.interval);
  }

  stop() {
    if (this.timer) clearInterval(this.timer);
    console.log("Cycle stopped");
  }
}

new DeadInside(token).start();
