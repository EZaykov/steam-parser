import "reflect-metadata";
import * as moment from "moment";
import * as di from "inversify";
import { TYPES } from "./";
import { ProxyList } from "./ProxyList";
import { DownloadJobController } from "./DownloadJobController";
import { DownloadJobFactory } from "./DownloadJobFactory";
import { DownloadEmitter } from "./DownloadEmitter";
import type { IDownloadJob } from "./DownloadJobs";
import { FrequentJob, ScheduledJob } from "./DownloadJobs";
import { EventEmitter } from "events";

let Container: di.Container;
let controller: DownloadJobController;

describe("pickJobBy (updateDate) method", () => {
	let updateDate = moment();

	describe("if updated", () => {
		const updated = true;

		it("should pick and run `ScheduledJob`", () => {
			controller.use(updated, updateDate);

			expect(getCurrentJob(controller)).toBeInstanceOf(ScheduledJob);
		});

		it("should pick and run `ScheduledJob` if `FrequentJob` is set", () => {
			setFrequentJob(controller);

			controller.use(updated, updateDate);

			expect(getCurrentJob(controller)).toBeInstanceOf(ScheduledJob);
		});

		it("should pick and run `FrequentJob` if `updateDate` in past more than one hour", () => {
			const hours = 2;

			updateDate = moment().subtract(hours, "hours");

			controller.use(updated, updateDate);

			expect(getCurrentJob(controller)).toBeInstanceOf(FrequentJob);
		});
	});

	describe("if not updated", () => {
		const updated = false;

		it("should pick and run `FrequentJob`", () => {
			controller.use(updated, updateDate);

			expect(getCurrentJob(controller)).toBeInstanceOf(FrequentJob);
		});

		it("should pick and run `FrequentJob` if `ScheduledJob` is set", () => {
			setScheduledJob(controller);

			controller.use(updated, updateDate);

			expect(getCurrentJob(controller)).toBeInstanceOf(FrequentJob);
		});
	});
});

/* -------------------------------------------------------------------------- */
/*                                    setup                                   */
/* -------------------------------------------------------------------------- */
beforeAll(() => {
	Object.getPrototypeOf(EventEmitter.prototype).constructor = Object; // eslint-disable-line
	Container = new di.Container({ skipBaseClassChecks: true });

	Container.bind(TYPES.DownloadJobController).to(DownloadJobController);

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

/* -------------------------------------------------------------------------- */
/*                                    util                                    */
/* -------------------------------------------------------------------------- */
const startEarlierInSeconds = 0;

function getCurrentJob(jobController: DownloadJobController): IDownloadJob {
	return Reflect.get(jobController, "currentJob") as IDownloadJob;
}

function setScheduledJob(jobController: DownloadJobController): void {
	Reflect.set(
		jobController,
		"currentJob",
		new ScheduledJob(moment(), startEarlierInSeconds, () => Promise.resolve())
	);
}

function setFrequentJob(jobController: DownloadJobController): void {
	Reflect.set(
		jobController,
		"currentJob",
		new FrequentJob(startEarlierInSeconds, () => Promise.resolve())
	);
}
