import { injectable, inject } from "inversify";
import { FrequentJob, ScheduledJob } from "./DownloadJobs";
import { DownloadProxyList } from "./downloadProxyList";
import { IDownloadEmitter } from "./DownloadEmitter";
import { TYPES } from "./types";

@injectable()
export class DownloadJobFactory {
	public createScheduledJob(fireDate: moment.Moment): ScheduledJob {
		return new ScheduledJob(fireDate, this.onTick);
	}

	public createFrequentJob(interval: number): FrequentJob {
		return new FrequentJob(interval, this.onTick);
	}

	constructor(
		@inject(TYPES.DownloadEmitter) downloadEmitter: IDownloadEmitter,
		@inject(TYPES.downloadProxyList) downloadProxyList: DownloadProxyList
	) {
		this.onTick = () =>
			downloadProxyList().then(
				(proxyList) => void downloadEmitter.emit("downloaded", proxyList)
			);
	}

	private readonly onTick: () => Promise<void>;
}
