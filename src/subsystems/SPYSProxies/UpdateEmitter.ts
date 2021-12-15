import { injectable } from "inversify";
import { EventEmitter } from "events";
import type { Proxy } from "./Proxy";

@injectable()
export class UpdateEmitter extends EventEmitter implements IUpdateEmitter {}

export interface IUpdateEmitter extends EventEmitter {
	emit(eventName: "update", proxies: Proxy[]): boolean;
	on(eventName: "update", listener: UpdateListener): this;
	once(eventName: "update", listener: UpdateListener): this;
	removeListener(eventName: "update", listener: UpdateListener): this;
}

export type UpdateListener = (proxies: Proxy[]) => void;
