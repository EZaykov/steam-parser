import { CronJob } from 'cron';
import { Moment } from 'moment';

export class ScheduledJob extends CronJob implements IDownloadJob {
  constructor(
    fireDate: Moment,
    startEarlierInSeconds: number,
    onTick: () => Promise<void>
  ) {
    super(
      fireDate.clone().subtract(startEarlierInSeconds, 'seconds'),
      onTick
    );
  }
}

export class FrequentJob implements IDownloadJob {
  public async start() {
    await this.onTick();
    this.interval = setInterval(this.onTick, this.frequency);
  }

  public stop() {
    if (this.interval) clearInterval(this.interval);
  }

  constructor(
    frequencyInSeconds: number,
    private readonly onTick: () => Promise<void>,
  ) {
    this.frequency = frequencyInSeconds * 1000;
  }

  private interval?: NodeJS.Timer;
  private readonly frequency: number;
}

export interface IDownloadJob {
  start(): void;
  stop(): void;
}
