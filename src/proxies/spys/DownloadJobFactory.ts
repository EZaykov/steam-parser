import { injectable, inject } from 'inversify';
import { FrequentJob, ScheduledJob } from './DownloadJobs';
import { DownloadProxyList } from './downloadProxyList';
import type { IDownloadEmitter } from './DownloadEmitter';
import { TYPES } from './types';

const START_EARLIER_IN_MINUTES = 5;
const FREQUENCY_IN_SECONDS = 30;

@injectable()
export class DownloadJobFactory {
  public createScheduledJob(fireDate: moment.Moment) {
    return new ScheduledJob(fireDate, START_EARLIER_IN_MINUTES, this.onTick);
  }

  public createFrequentJob() {
    return new FrequentJob(FREQUENCY_IN_SECONDS, this.onTick);
  }

  constructor(
    @inject(TYPES.DownloadEmitter) downloadEmitter: IDownloadEmitter,
    @inject(TYPES.downloadProxyList) downloadProxyList: DownloadProxyList
  ) {
    this.onTick = () => downloadProxyList()
      .then(proxyList => void downloadEmitter.emit('downloaded', proxyList));
  }

  private readonly onTick: () => Promise<void>;
}
