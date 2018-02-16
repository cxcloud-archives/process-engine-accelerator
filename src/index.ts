import {
  createQueuePool,
  createQueueProcessor,
  Message
} from '@cxcloud/process-engine-core';
import * as config from 'config';
import * as emailProcessor from './processors/email';
import { logger } from './utils/logger';

const DEFAULT_REGION = config.get<string>('region');

const catchAll = (e: Message) => {
  logger.warn('No processor found for action. Sending back queue.', e.data);
  e.next();
};

const pool = createQueuePool([
  createQueueProcessor(
    {
      name: config.get<string>('sqs.events'),
      region: DEFAULT_REGION
    },
    [emailProcessor],
    catchAll
  )
]);

pool.start();
