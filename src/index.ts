import {
  createQueuePool,
  createQueueProcessor,
  Message
} from '@cxcloud/process-engine-core';
import * as emailProcessor from './processors/email';

const catchAll = (e: Message) => {
  console.log('NOT FOUND FOR ', e.data);
  return e.next();
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
