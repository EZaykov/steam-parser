import { injectable, inject } from 'inversify';
import { Moment } from 'moment';
import { TYPES } from './types';
import type { DownloadProxyList } from './downloadProxyList';
import type { IUpdateEmitter } from './UpdateEmitter';
import type { DownloadJobController } from './DownloadJobController';
import type { IDownloadEmitter } from './DownloadEmitter';
import type { ProxyList } from './ProxyList';

@injectable()
export class AutoUpdateController {
  public startAutoUpdates() {
    if (this.autoUpdatesIsRunning) return;
    this.autoUpdatesIsRunning = true;
    return this.manualUpdate();
  }

  public stopAutoUpdates() {
    this.autoUpdatesIsRunning = false;
    this.downloadJobController.clear();
  }

  constructor(
    @inject(TYPES.downloadProxyList) private downloadProxyList: DownloadProxyList,
    @inject(TYPES.UpdateEmitter) private updateEmitter: IUpdateEmitter,
    @inject(TYPES.DownloadJobController) private downloadJobController: DownloadJobController,
    @inject(TYPES.DownloadEmitter) private downloadEmitter: IDownloadEmitter
  ) {
    this.downloadEmitter.on('downloaded', this.downloadListener.bind(this));
  }

  private autoUpdatesIsRunning = false;
  private prevUpdateDate?: Moment;

  private downloadListener(proxyList: ProxyList) {
    const { updatedDate, proxies } = proxyList;
    const isUpdated = !updatedDate.isSame(this.prevUpdateDate);
    this.prevUpdateDate = updatedDate;

    if (this.autoUpdatesIsRunning)
      this.downloadJobController.use(isUpdated, proxyList.updatedDate);
    if (isUpdated)
      this.updateEmitter.emit('update', proxies);
  };

  private async manualUpdate() {
    const proxyList = await this.downloadProxyList();
    this.downloadEmitter.emit('downloaded', proxyList);

    return proxyList;
  }
}
