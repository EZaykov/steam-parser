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
import * as SPYS from "./subsystems/SPYSProxies";

Container.bind(SPYS.TYPES.SubSystem).to(SPYS.SubSystem).inSingletonScope();

[
	Container.bind(SPYS.TYPES.AutoUpdateController).to(SPYS.AutoUpdateController),
	Container.bind(SPYS.TYPES.UpdateEmitter).to(SPYS.UpdateEmitter),
	Container.bind(SPYS.TYPES.DownloadJobController).to(SPYS.DownloadJobController),
	Container.bind(SPYS.TYPES.DownloadJobFactory).to(SPYS.DownloadJobFactory),
	Container.bind(SPYS.TYPES.DownloadEmitter).to(SPYS.DownloadEmitter)
]
	.map((v) => v.inRequestScope())
	.concat(Container.bind(SPYS.TYPES.downloadProxyList).toFunction(SPYS.downloadProxyList))
	.map((v) => v.whenAnyAncestorIs(SPYS. SubSystem));

export { Container };
