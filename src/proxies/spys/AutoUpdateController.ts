import { injectable, inject } from 'inversify';
import { TYPES } from './types';
import { DownloadProxyList } from './downloadProxyList';
import { IUpdateEmitter } from './UpdateEmitter';
import { DownloadJobController } from './DownloadJobController';
import { IDownloadEmitter } from './DownloadEmitter';
import type { Moment } from 'moment';
import type { ProxyList } from './ProxyList';

@injectable()
export class AutoUpdateController {
  public startAutoUpdates(): undefined | Promise<ProxyList> {
    if (this.autoUpdatesIsRunning) {
      return;
    }

    this.autoUpdatesIsRunning = true;

    return this.manualUpdate();
  }

  public stopAutoUpdates(): void {
    this.autoUpdatesIsRunning = false;
    this.downloadJobController.clear();
  }

  constructor(
    @inject(TYPES.downloadProxyList) private readonly downloadProxyList: DownloadProxyList,
    @inject(TYPES.UpdateEmitter) private readonly updateEmitter: IUpdateEmitter,
    @inject(TYPES.DownloadJobController) private readonly downloadJobController: DownloadJobController,
    @inject(TYPES.DownloadEmitter) private readonly downloadEmitter: IDownloadEmitter
  ) {
    this.downloadEmitter.on('downloaded', this.downloadListener.bind(this));
  }

  private autoUpdatesIsRunning = false;

  private prevUpdateDate?: Moment;

  private downloadListener(proxyList: ProxyList): void {
    const { updatedDate, proxies } = proxyList;
    const isUpdated = !updatedDate.isSame(this.prevUpdateDate);

    this.prevUpdateDate = updatedDate;

    if (this.autoUpdatesIsRunning) {
      this.downloadJobController.use(isUpdated, proxyList.updatedDate);
    }
    if (isUpdated) {
      this.updateEmitter.emit('update', proxies);
    }
  }

  private async manualUpdate(): Promise<ProxyList> {
    const proxyList = await this.downloadProxyList();

    this.downloadEmitter.emit('downloaded', proxyList);

    return proxyList;
  }
}
