import { injectable, inject } from 'inversify';
import * as moment from 'moment';
import { TYPES } from './types';
import { IDownloadJob, FrequentJob } from './DownloadJobs';
import type { DownloadJobFactory } from './DownloadJobFactory';

@injectable()
export class DownloadJobController {
  public clear() {
    this.currentJob?.stop();
    delete this.currentJob;
  }

  public use(isUpdated: boolean, currentUpdateDate: moment.Moment) {
    const nextDownloadDate = this.getNextDownloadDate(currentUpdateDate);

    if (!isUpdated || this.isPast(nextDownloadDate))
      return this.fireFrequently();
    this.scheduleBy(nextDownloadDate);
  }

  constructor(@inject(TYPES.DownloadJobFactory) private jobFactory: DownloadJobFactory) { }

  private scheduleBy(date: moment.Moment) {
    this.currentJob?.stop();
    this.currentJob = this.jobFactory.createScheduledJob(date);
    this.currentJob.start();
  }

  private fireFrequently() {
    if (this.currentJob instanceof FrequentJob) return;

    this.currentJob?.stop();
    this.currentJob = this.jobFactory.createFrequentJob();
    this.currentJob.start();
  }

  private isPast(date: moment.Moment) {
    return date.diff(moment()) < 0;
  }

  private getNextDownloadDate(date: moment.Moment) {
    return date.clone().add(1, 'hour');
  }

  private currentJob?: IDownloadJob;
}
