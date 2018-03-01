import * as config from 'config';
import { SQS } from 'aws-sdk';
import { getSharedPool } from '../pool';

const actionQueueName = config.get<string>('sqs.actions');

export function sendAction(body = {}): Promise<SQS.SendMessageResult> {
  const queue = getSharedPool();
  return queue.findByName(actionQueueName).sendMessage({
    body
  });
}
