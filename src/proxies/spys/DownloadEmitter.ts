import { injectable } from "inversify";
import { EventEmitter } from "events";
import type { ProxyList } from "./ProxyList";

@injectable()
export class DownloadEmitter extends EventEmitter implements IDownloadEmitter {}

export interface IDownloadEmitter extends EventEmitter {
	emit(eventName: "downloaded", proxyList: ProxyList): boolean;
	on(eventName: "downloaded", listener: (proxyList: ProxyList) => void): this;
	once(eventName: "downloaded", listener: (proxyList: ProxyList) => void): this;
	removeListener(eventName: "downloaded", listener: (proxyList: ProxyList) => void): this;
}
