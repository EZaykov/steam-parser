import * as _ from 'lodash';
import * as moment from 'moment';
import fetch from 'node-fetch';
import { ProxyList } from './ProxyList';
import { Proxy } from './Proxy';

const URL = 'http://spys.me/proxy.txt';

export const downloadProxyList: DownloadProxyList = () =>
  fetch(URL)
    .then(res => res.text())
    .then(text => parseProxyListTxt(text));

function parseProxyListTxt(text: string): ProxyList {
  const allLines = text.split('\n');
  const headerIndentLineIndex = allLines.indexOf('');
  const footerIndentLineIndex = allLines.lastIndexOf('\r');
  const proxyLines = allLines.slice(headerIndentLineIndex + 1, footerIndentLineIndex);
  const proxies = proxyLines.map(v => parseProxyLine(v));
  return new ProxyList(
    parseProxyListUpdateDate(allLines[0]),
    proxies
  );
}

function parseProxyLine(proxyLine: string): Proxy {
  const [address, description, googlePassed] = proxyLine.split(' ');
  const [countryCode, anonymous, sslSupport] = description.replace('!', '').split('-');
  return {
    address: address.trim(),
    description: {
      googlePassed: googlePassed.trim() === '+',
      countryCode: countryCode.trim(),
      anonymous: anonymous.trim() !== 'N',
      sslSupport: !!sslSupport && sslSupport.trim() === 'S'
    }
  }
}

function parseProxyListUpdateDate(firstLine: string): moment.Moment {
  const unparsedDate = firstLine.match(/updated at (.*)/)![1];
  return moment(unparsedDate, 'ddd, DD MMM YY HH:mm:ss Z');
}

export type DownloadProxyList = () => Promise<ProxyList>;
