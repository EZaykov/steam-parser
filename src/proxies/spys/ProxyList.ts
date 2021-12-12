import type { Proxy } from './Proxy';
import * as moment from 'moment';

export class ProxyList {
  public isUpdatedLastHour() {
    const prevHour = this.downloadDate.clone().subtract(1, 'hour');
    return this.updatedDate.isBetween(prevHour, this.downloadDate);
  }
  public readonly downloadDate = moment();

  constructor(
    public readonly updatedDate: moment.Moment,
    public readonly proxies: Proxy[]
  ) { }

}
