import 'reflect-metadata';
import * as di from 'inversify';

const Container = new di.Container({ skipBaseClassChecks: true });

/* -------------------------------------------------------------------------- */
/*                                 SpysService                                */
/* -------------------------------------------------------------------------- */
import * as spys from './proxies/spys';

Container.bind(spys.TYPES.Service).to(spys.Service).inSingletonScope();

[
  Container.bind(spys.TYPES.AutoUpdateController).to(spys.AutoUpdateController),
  Container.bind(spys.TYPES.UpdateEmitter).to(spys.UpdateEmitter),
  Container.bind(spys.TYPES.DownloadJobController).to(spys.DownloadJobController),
  Container.bind(spys.TYPES.DownloadJobFactory).to(spys.DownloadJobFactory),
  Container.bind(spys.TYPES.DownloadEmitter).to(spys.DownloadEmitter)
]
  .map(v => v.inRequestScope())
  .concat(Container.bind(spys.TYPES.downloadProxyList).toFunction(spys.downloadProxyList))
  .map(v => v.whenAnyAncestorIs(spys.Service));

export { Container };
