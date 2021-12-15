import { injectable, inject } from "inversify";
import * as moment from "moment";
import { TYPES } from "./types";
import type { IDownloadJob } from "./DownloadJobs";
import type { CONFIG } from "../../app.config";
import { DownloadJobFactory } from "./DownloadJobFactory";

@injectable()
export class DownloadJobController {
	public clear(): void {
		this.jobCurrent?.stop();
		this.jobCurrent = undefined;
	}

	public use(isUpdated: boolean, currentUpdateDate: moment.Moment): IDownloadJob {
		const nextDownloadDate = this.getNextDownloadDate(currentUpdateDate);

		this.jobCurrent?.stop();
		this.jobCurrent =
			!isUpdated || this.isPast(nextDownloadDate)
				? this.jobFactory.createFrequentJob(this.jobInterval.frequent)
				: this.jobFactory.createScheduledJob(nextDownloadDate);
		this.jobCurrent.start();

		return this.jobCurrent;
	}

	constructor(
		@inject("CONFIG") config: typeof CONFIG,
		@inject(TYPES.DownloadJobFactory)
		private readonly jobFactory: DownloadJobFactory
	) {
		this.jobInterval = {
			frequent: config.SPYSProxiesService.frequentJob.interval,
			scheduled: config.SPYSProxiesService.scheduledJob.interval
		};
	}

	private jobCurrent?: IDownloadJob;

	private readonly jobInterval: {
		frequent: number;
		scheduled: number;
	};

	private isPast(date: moment.Moment): boolean {
		const noDiff = 0;

		return date.diff(moment()) < noDiff;
	}

	private getNextDownloadDate(date: moment.Moment): moment.Moment {
		return date.clone().add(this.jobInterval.scheduled, "milliseconds");
	}
}
