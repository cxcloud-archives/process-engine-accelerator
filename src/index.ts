import {
  createQueuePool,
  createQueueProcessor,
  Message
} from '@cxcloud/process-engine-core';
import * as emailProcessor from './processors/email';
import { logger } from './utils/logger';

const catchAll = (e: Message) => {
  logger.warn('No processor found for action. Sending back queue.', e.data);
  e.next();
};

const pool = createQueuePool([
  createQueueProcessor(
    {
      name: 'my-sqs-queue',
      region: 'eu-west-1'
    },
    [emailProcessor],
    catchAll
  )
]);

pool.start();
