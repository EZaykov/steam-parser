import { CronJob } from "cron";
import type { Moment } from "moment";

export class ScheduledJob implements IDownloadJob {
	public start(): void {
		this.job.start();
	}

	public stop(): void {
		this.job.stop();
	}

	constructor(fireTime: Moment, onTick: () => Promise<void>) {
		this.job = new CronJob(fireTime, onTick); // eslint-disable-line
	}

	private readonly job: CronJob;
}

export class FrequentJob implements IDownloadJob {
	public async start(): Promise<void> {
		await this.onTick();
		this.timer = setInterval(this.onTick, this.interval); // eslint-disable-line
	}

	public stop(): void {
		if (this.timer) {
			clearInterval(this.timer);
		}
	}

	constructor(
		private readonly interval: number,
		private readonly onTick: () => Promise<void>
	) {}

	private timer?: NodeJS.Timer;
}

export interface IDownloadJob {
	start(): void;
	stop(): void;
}
