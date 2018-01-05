import { Message, SendMessageFunction } from '@cxcloud/process-engine-core';
import { createProcessorAction } from '../utils/tools';

export const conditions = [
  {
    path: 'type',
    value: 'email'
  }
];

export const action = createProcessorAction(
  async (message: Message, sendMessage: SendMessageFunction) => {
    console.log('Doing stuff here');
  },
  true
);
