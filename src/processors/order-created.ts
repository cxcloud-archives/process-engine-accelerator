import * as config from 'config';
import { Message, SendMessageFunction } from '@cxcloud/process-engine-core';
import { createProcessorAction } from '../utils/tools';
import { sendAction } from '../utils/queue';

const sesConfig = config.get<any>('ses');

export const conditions = [
  { path: 'type', value: 'OrderCreated' },
  { path: 'notificationType', value: 'Message' }
];

export const action = createProcessorAction((message: Message) => {
  const { order } = message.data;
  return sendAction({
    type: 'email',
    from: sesConfig.from,
    to: order.customerEmail,
    subject: 'Thanks! Your order has been received',
    data: order,
    templateName: 'order-created'
  });
});
