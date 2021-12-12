import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import type { AutoUpdateController } from './AutoUpdateController';
import type { IUpdateEmitter, UpdateListener } from './UpdateEmitter';

@injectable()
export class Service {
  public startAutoUpdates() {
    return this.autoUpdateController.startAutoUpdates();
  }

  public stopAutoUpdates() {
    return this.autoUpdateController.stopAutoUpdates();
  }

  public onUpdate(listener: UpdateListener) {
    this.updateEmitter.on('update', listener);
  }

  public removeUpdateListener(listener: UpdateListener) {
    this.updateEmitter.removeListener('update', listener);
  }

  constructor(
    @inject(TYPES.AutoUpdateController) private autoUpdateController: AutoUpdateController,
    @inject(TYPES.UpdateEmitter) private updateEmitter: IUpdateEmitter,
  ) { }
}
