import "reflect-metadata";
import * as moment from "moment";
import * as DI from "inversify";
import { TYPES } from ".";
import { ProxyList } from "./ProxyList";
import { DownloadJobController } from "./DownloadJobController";
import { DownloadJobFactory } from "./DownloadJobFactory";
import { DownloadEmitter } from "./DownloadEmitter";
import { FrequentJob, ScheduledJob } from "./DownloadJobs";
import { EventEmitter } from "events";
import { CONFIG } from "../../app.config";

let Container: DI.Container;
let controller: DownloadJobController;

describe("pickJobBy (updateDate) method", () => {
	let updateDate = moment();

	describe("if updated", () => {
		const updated = true;

		it("should pick and run `ScheduledJob`", () => {
			const settledJob = controller.use(updated, updateDate);

			expect(settledJob).toBeInstanceOf(ScheduledJob);
		});

		it("should pick and run `FrequentJob` if `updateDate` in past more than one hour", () => {
			const hours = 2;

			updateDate = moment().subtract(hours, "hours");

			const settledJob = controller.use(updated, updateDate);

			expect(settledJob).toBeInstanceOf(FrequentJob);
		});
	});

	describe("if not updated", () => {
		const updated = false;

		it("should pick and run `FrequentJob`", () => {
			const settledJob = controller.use(updated, updateDate);

			expect(settledJob).toBeInstanceOf(FrequentJob);
		});
	});
});

/* -------------------------------------------------------------------------- */
/*                                    setup                                   */
/* -------------------------------------------------------------------------- */
beforeAll(() => {
	Object.getPrototypeOf(EventEmitter.prototype).constructor = Object; // eslint-disable-line
	Container = new DI.Container({ skipBaseClassChecks: true });

	Container.bind(TYPES.DownloadJobController).to(DownloadJobController);
	Container.bind("CONFIG").toConstantValue(CONFIG);

	[
		Container.bind(TYPES.DownloadJobFactory).to(DownloadJobFactory),
		Container.bind(TYPES.DownloadEmitter).to(DownloadEmitter)
	]
		.map((v) => v.inRequestScope())
		.concat(
			Container.bind(TYPES.downloadProxyList).toFunction(() =>
				Promise.resolve(new ProxyList(moment(), []))
			)
		)
		.map((v) => v.whenAnyAncestorIs(DownloadJobController));
});

beforeEach(() => {
	controller = Container.get(TYPES.DownloadJobController);
});

afterEach(() => {
	controller.clear();
});
