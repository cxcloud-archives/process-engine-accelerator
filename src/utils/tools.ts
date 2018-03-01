import { Message, SendMessageFunction } from '@cxcloud/process-engine-core';
import { logger } from './logger';

export type ProcessActionFn = (
  message: Message,
  sendMessage: SendMessageFunction
) => Promise<any>;

export function createProcessorAction(
  fn: ProcessActionFn,
  deleteMessage = true
) {
  return function processMessage(
    message: Message,
    sendMessage: SendMessageFunction
  ) {
    logger.info('Received Message', message.data);
    return fn(message, sendMessage)
      .then(response => {
        logger.info(
          `Action succeeded for message ${message.name}`,
          response ? response : ''
        );
        if (deleteMessage) {
          return message.deleteMessage().then(() => message.next());
        }
        return message.next();
      })
      .catch(err => {
        logger.error('Action failed:', err);
        return message.next();
      })
      .then(() => {
        logger.info('Message processed. Calling next');
      });
  };
}
