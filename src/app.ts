import "reflect-metadata";
import * as _ from 'lodash';
import fetch from 'node-fetch';
import { Container } from './inversify.config';
import * as spys from './proxies/spys';
import { UpdateListener } from './proxies/spys/UpdateEmitter';
import { HttpsProxyAgent as ProxyAgent } from 'https-proxy-agent';

const dataUrl = 'https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=default&sort_dir=desc&appid=578080&norender=1&count=100';

const spysService = Container.get<spys.Service>(spys.TYPES.Service);

const listener: UpdateListener = async proxies => {
  spysService.removeUpdateListener(listener);
  spysService.stopAutoUpdates();

  const anonymousChunks = _(proxies)
    .filter(({ description }) => description.anonymous)
    .chunk(50)
    .value();

  const chunk = anonymousChunks[0];

  const result = await Promise.all(chunk.map(proxy => tryToParse(proxy.address)));

  //console.log(result);

  function tryToParse(proxy: string) {
    const proxyAgent = new ProxyAgent(`http://${proxy}`);

    return fetch(dataUrl, { agent: proxyAgent })
      .then(res => res.json())
      .then(json => console.log('GOT JSON!'))
      .catch(e => console.log('error'))
  }
}



















spysService.onUpdate(listener);
spysService.startAutoUpdates();
