import { Message, SendMessageFunction } from '@cxcloud/process-engine-core';
import { deleteAndCallNext } from '../utils/message';

export const conditions = [
  {
    path: 'type',
    value: 'email'
  }
];

export const action = (message: Message, sendMessage: SendMessageFunction) => {
  console.log('Got an email request', message.data);

  return deleteAndCallNext(message);
};
