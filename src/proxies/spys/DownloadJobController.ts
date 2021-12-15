import { injectable, inject } from "inversify";
import * as moment from "moment";
import { TYPES } from "./types";
import type { IDownloadJob } from "./DownloadJobs";
import type { CONFIG } from "../../app.config";
import { DownloadJobFactory } from "./DownloadJobFactory";

@injectable()
export class DownloadJobController {
	public use(isUpdated: boolean, currentUpdateDate: moment.Moment): IDownloadJob {
		const nextDownloadDate = getNextDownloadDate(
			currentUpdateDate,
			this.jobInterval.scheduled
		);

		this.jobCurrent?.stop();
		this.jobCurrent =
			!isUpdated || isPastDate(nextDownloadDate)
				? this.jobFactory.createFrequentJob(this.jobInterval.frequent)
				: this.jobFactory.createScheduledJob(nextDownloadDate);
		this.jobCurrent.start();

		return this.jobCurrent;
	}

	public clear(): void {
		this.jobCurrent?.stop();
		this.jobCurrent = undefined;
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
}

function getNextDownloadDate(date: moment.Moment, interval: number): moment.Moment {
	return date.clone().add(interval, "milliseconds");
}

function isPastDate(date: moment.Moment): boolean {
	const noDiff = 0;

	return date.diff(moment()) < noDiff;
}
