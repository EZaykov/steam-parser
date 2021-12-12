import { TYPES as spysTypes } from './proxies/spys/types';
import type { Service as SpysService } from './proxies/spys/Service';
import type { UpdateListener as SpysUpdateListener } from './proxies/spys/UpdateEmitter';
import type { Proxy as SpysProxy } from './proxies/spys/Proxy';

export const TYPES = {
  SpysProxyService: spysTypes.Service
};

export namespace spysProxies {
  export type Service = SpysService;
  export type UpdateListener = SpysUpdateListener;
  export type Proxy = SpysProxy;
}
