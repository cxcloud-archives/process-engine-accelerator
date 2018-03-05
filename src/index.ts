import {
  createQueuePool,
  createQueueProcessor,
  Message
} from '@cxcloud/process-engine-core';
import * as config from 'config';
import * as emailProcessor from './processors/email';
import * as orderCreatedProcessor from './processors/order-created';
import { logger } from './utils/logger';
import { getSharedPool } from './pool';

const DEFAULT_REGION = config.get<string>('region');

const catchAll = (e: Message) => {
  logger.warn('No processor found for action. Sending back queue.', e.data);
  e.next();
};

const pool = getSharedPool();

pool.setProcessors([
  createQueueProcessor(
    {
      name: config.get<string>('sqs.events'),
      region: DEFAULT_REGION
    },
    [orderCreatedProcessor],
    catchAll
  ),
  createQueueProcessor(
    {
      name: config.get<string>('sqs.actions'),
      region: DEFAULT_REGION
    },
    [emailProcessor],
    catchAll
  )
]);

pool.start();
