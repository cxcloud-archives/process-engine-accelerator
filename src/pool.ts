import { createQueuePool, QueuePool } from '@cxcloud/process-engine-core';

let __pool: QueuePool;

export function getSharedPool(): QueuePool {
  if (!__pool) {
    __pool = createQueuePool([]);
  }
  return __pool;
}
