import {
  createQueuePool,
  createQueueProcessor
} from '@cxcloud/process-engine-core';

const pool = createQueuePool([
  createQueueProcessor(
    {
      name: 'my-sqs-queue',
      region: 'eu-west-1',
      concurrency: 1
    },
    [
      {
        conditions: [
          {
            path: 'myEvent.name',
            value: 'sallar'
          },
          {
            path: 'myEvent.type',
            value: 'gold'
          }
        ],
        action: e => {
          console.log(e.data);
          return e.deleteMessage().then(() => {
            console.log('calling next');
            return e.next();
          });
        }
      }
    ],
    e => {
      console.log('NOT FOUND FOR ', e.data);
      return e.next();
    }
  )
]);

pool.start();
setTimeout(() => {
  pool.findByName('my-sqs-queue').sendMessage({
    hello: 'blam'
  });
}, 5000);
