import type { Proxy } from "./Proxy";
import * as moment from "moment";

export class ProxyList {
	public readonly downloadDate = moment();

	public isUpdatedLastHour(): boolean {
		const hours = 1;
		const prevHour = this.downloadDate.clone().subtract(hours, "hour");

		return this.updatedDate.isBetween(prevHour, this.downloadDate);
	}

	constructor(
		public readonly updatedDate: moment.Moment,
		public readonly proxies: Proxy[]
	) {}
}
