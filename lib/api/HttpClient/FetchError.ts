const descriptors: Record<string, { value: string }> = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL',
  'DYNAMIC_SERVER_USAGE',
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});

interface Cause {
  digest?: string;
  status?: number;
  body?: string;
  code?: string;
  description?: string;
  [key: string]: unknown;
}

export default class FetchError extends Error {
  public code?: string;

  public cause?: Cause;

  constructor(message: string, opts?: { cause: any }) {
    super(message, opts);

    this.name = 'FetchError';

    // Polyfill cause for other runtimes
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
