import 'reflect-metadata';
import * as moment from 'moment';
import * as di from 'inversify';
import { TYPES } from './';
import { ProxyList } from './ProxyList';
import { DownloadJobController } from './DownloadJobController';
import { DownloadJobFactory } from './DownloadJobFactory';
import { DownloadEmitter } from './DownloadEmitter';
import { IDownloadJob, FrequentJob, ScheduledJob } from './DownloadJobs';
import { EventEmitter } from 'events';

let Container: di.Container;
let controller: DownloadJobController;

describe('pickJobBy (updateDate) method', () => {
  const updateDate = moment();

  describe('if updated', () => {
    const updated = true;

    it('should pick and run `HourlyJob`', () => {
      controller.use(updated, updateDate);

      expect(getCurrentJob(controller)).toBeInstanceOf(ScheduledJob);
    });

    it('should pick and run `HourlyJob` if `SpamJob` is set', () => {
      setSpamJob(controller);

      controller.use(updated, updateDate);

      expect(getCurrentJob(controller)).toBeInstanceOf(ScheduledJob);
    });

    it('should pick and run `SpamJob` if `updateDate` in past more than one hour', () => {
      const updateDate = moment().subtract(2, 'hours');

      controller.use(updated, updateDate);

      expect(getCurrentJob(controller)).toBeInstanceOf(FrequentJob);
    });
  });

  describe('if not updated', () => {
    const updated = false;

    it('should pick and run `SpamJob`', () => {
      controller.use(updated, updateDate);

      expect(getCurrentJob(controller)).toBeInstanceOf(FrequentJob);
    });

    it('should pick and run `SpamJob` if `HourlyJob` is set', () => {
      setHourlyJob(controller);

      controller.use(updated, updateDate);

      expect(getCurrentJob(controller)).toBeInstanceOf(FrequentJob);
    });
  });
});

/* -------------------------------------------------------------------------- */
/*                                    setup                                   */
/* -------------------------------------------------------------------------- */
beforeAll(() => {
  Object.getPrototypeOf(EventEmitter.prototype).constructor = Object;
  Container = new di.Container({ skipBaseClassChecks: true });

  Container.bind(TYPES.DownloadJobController).to(DownloadJobController);

  [
    Container.bind(TYPES.DownloadJobFactory).to(DownloadJobFactory),
    Container.bind(TYPES.DownloadEmitter).to(DownloadEmitter)
  ]
    .map(v => v.inRequestScope())
    .concat(Container.bind(TYPES.downloadProxyList).toFunction(
      () => Promise.resolve(new ProxyList(moment(), []))
    ))
    .map(v => v.whenAnyAncestorIs(DownloadJobController));
});

beforeEach(() => {
  controller = Container.get(TYPES.DownloadJobController);
});

afterEach(() => {
  controller.clear();
});

/* -------------------------------------------------------------------------- */
/*                                    util                                    */
/* -------------------------------------------------------------------------- */
const getCurrentJob = (jobController: DownloadJobController) =>
  Reflect.get(jobController, 'currentJob') as IDownloadJob;
const setHourlyJob = (jobController: DownloadJobController) =>
  Reflect.set(jobController, 'currentJob', new ScheduledJob(moment(), 0, () => Promise.resolve()));
const setSpamJob = (jobController: DownloadJobController) =>
  Reflect.set(jobController, 'currentJob', new FrequentJob(0, () => Promise.resolve()));
