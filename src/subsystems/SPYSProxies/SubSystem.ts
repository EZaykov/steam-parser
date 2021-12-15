import { injectable, inject } from "inversify";
import { TYPES } from "./types";
import { AutoUpdateController } from "./AutoUpdateController";
import { IUpdateEmitter } from "./UpdateEmitter";
import type { UpdateListener } from "./UpdateEmitter";

@injectable()
export class SubSystem {
	public async startAutoUpdates(): Promise<void> {
		await this.autoUpdateController.startAutoUpdates();
	}

	public stopAutoUpdates(): void {
		return void this.autoUpdateController.stopAutoUpdates();
	}

	public onUpdate(listener: UpdateListener): void {
		this.updateEmitter.on("update", listener);
	}

	public removeUpdateListener(listener: UpdateListener): void {
		this.updateEmitter.removeListener("update", listener);
	}

	constructor(
		@inject(TYPES.AutoUpdateController)
		private readonly autoUpdateController: AutoUpdateController,
		@inject(TYPES.UpdateEmitter)
		private readonly updateEmitter: IUpdateEmitter
	) {}
}
