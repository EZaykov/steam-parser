import { CronJob } from "cron";
import type { Moment } from "moment";

export class ScheduledJob extends CronJob implements IDownloadJob {
	constructor(fireDate: Moment, startEarlierInSeconds: number, onTick: () => Promise<void>) {
		super(fireDate.clone().subtract(startEarlierInSeconds, "seconds"), onTick);
	}
}

export class FrequentJob implements IDownloadJob {
	public async start(): Promise<void> {
		await this.onTick();
		this.interval = setInterval(this.onTick, this.frequency); // eslint-disable-line
	}

	public stop(): void {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	constructor(frequencyInSeconds: number, private readonly onTick: () => Promise<void>) {
		const msMultiplier = 1000;

		this.frequency = frequencyInSeconds * msMultiplier;
	}

	private interval?: NodeJS.Timer;

	private readonly frequency: number;
}

export interface IDownloadJob {
	start(): void;
	stop(): void;
}
