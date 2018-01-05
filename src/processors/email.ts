import { Message, SendMessageFunction } from '@cxcloud/process-engine-core';
import { createAction } from '../utils/tools';

export const conditions = [
  {
    path: 'type',
    value: 'email'
  }
];

export const action = createAction(
  async (message: Message, sendMessage: SendMessageFunction) => {
    console.log('Doing stuff here');
  },
  true
);
