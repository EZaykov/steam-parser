import "reflect-metadata";
import * as DI from "inversify";
import { CONFIG } from "./app.config";

const Container = new DI.Container({
	skipBaseClassChecks: true
});

Container.bind("CONFIG").toConstantValue(CONFIG);

/* -------------------------------------------------------------------------- */
/*                                 SPYSService                                */
/* -------------------------------------------------------------------------- */
import * as SPYS from "./proxies/SPYS";

Container.bind(SPYS.TYPES.Service).to(SPYS.Service).inSingletonScope();

[
	Container.bind(SPYS.TYPES.AutoUpdateController).to(SPYS.AutoUpdateController),
	Container.bind(SPYS.TYPES.UpdateEmitter).to(SPYS.UpdateEmitter),
	Container.bind(SPYS.TYPES.DownloadJobController).to(SPYS.DownloadJobController),
	Container.bind(SPYS.TYPES.DownloadJobFactory).to(SPYS.DownloadJobFactory),
	Container.bind(SPYS.TYPES.DownloadEmitter).to(SPYS.DownloadEmitter)
]
	.map((v) => v.inRequestScope())
	.concat(Container.bind(SPYS.TYPES.downloadProxyList).toFunction(SPYS.downloadProxyList))
	.map((v) => v.whenAnyAncestorIs(SPYS.Service));

export { Container };
