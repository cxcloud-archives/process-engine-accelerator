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
  let email = order.customerEmail;

  if (!email && order.shippingAddress) {
    email = order.shippingAddress.email;
  }

  if (!email) {
    return Promise.reject('No email address found in order');
  }

  return sendAction({
    type: 'email',
    from: `${sesConfig.fromName} <${sesConfig.from}>`,
    to: email,
    subject: 'Thanks! Your order has been received',
    data: order,
    templateName: 'order-created'
  });
});
