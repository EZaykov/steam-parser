import * as moment from 'moment';
import { ProxyList } from './ProxyList';

let proxyList: ProxyList;

describe('isUpdatedLastHour method', () => {
  it('should return `true` if passed `updateDate` within 1 past hour range', () => {
    const hourMiddleInMinutes = 30;
    const updateDate = moment().subtract(hourMiddleInMinutes, 'minutes');

    proxyList = new ProxyList(updateDate, []);

    expect(() => proxyList.isUpdatedLastHour()).toBeTruthy();
  });
});
