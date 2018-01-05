import { Message } from '@cxcloud/process-engine-core';

export function deleteAndCallNext(message: Message) {
  return message.deleteMessage().then(() => message.next());
}
