import { injectable, inject } from "inversify";
import * as moment from "moment";
import { TYPES } from "./types";
import type { IDownloadJob } from "./DownloadJobs";
import { FrequentJob } from "./DownloadJobs";
import { DownloadJobFactory } from "./DownloadJobFactory";

@injectable()
export class DownloadJobController {
	public clear(): void {
		this.currentJob?.stop();
		delete this.currentJob;
	}

	public use(isUpdated: boolean, currentUpdateDate: moment.Moment): void {
		const nextDownloadDate = this.getNextDownloadDate(currentUpdateDate);

		if (!isUpdated || this.isPast(nextDownloadDate)) {
			return void this.fireFrequently();
		}

		this.scheduleBy(nextDownloadDate);
	}

	constructor(
		@inject(TYPES.DownloadJobFactory)
		private readonly jobFactory: DownloadJobFactory
	) {}

	private currentJob?: IDownloadJob;

	private scheduleBy(date: moment.Moment): void {
		this.currentJob?.stop();
		this.currentJob = this.jobFactory.createScheduledJob(date);
		this.currentJob.start();
	}

	private fireFrequently(): void {
		if (this.currentJob instanceof FrequentJob) {
			return;
		}

		this.currentJob?.stop();
		this.currentJob = this.jobFactory.createFrequentJob();
		this.currentJob.start();
	}

	private isPast(date: moment.Moment): boolean {
		const noDiff = 0;

		return date.diff(moment()) < noDiff;
	}

	private getNextDownloadDate(date: moment.Moment): moment.Moment {
		const nextUpdateIn = 1; // hours

		return date.clone().add(nextUpdateIn, "hour");
	}
}
