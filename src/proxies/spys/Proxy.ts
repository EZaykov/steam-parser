export interface Proxy {
  readonly address: string;
  readonly description: {
    countryCode: string;
    anonymous: boolean;
    googlePassed: boolean;
    sslSupport: boolean;
  };
}
