import { Message, SendMessageFunction } from '@cxcloud/process-engine-core';
import { createProcessorAction } from '../utils/tools';
import { sendAction } from '../utils/queue';

export const conditions = [
  { path: 'type', value: 'OrderCreated' },
  { path: 'notificationType', value: 'Message' }
];

export const action = createProcessorAction((message: Message) => {
  return sendAction({
    type: 'email',
    from: 'sallar@cxcloud.com',
    to: 'sallar@kaboli.org',
    subject: 'Order Received!',
    data: message.data.order,
    templateName: 'order-created'
  });
});
