import { Message, SendMessageFunction } from '@cxcloud/process-engine-core';
import { createProcessorAction } from '../utils/tools';
import * as config from 'config';
import { readFileSync } from 'fs';
import * as path from 'path';
import * as ejs from 'ejs';
import * as nodemailer from 'nodemailer';
import { SES } from 'aws-sdk';

// create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: new SES({
    apiVersion: '2010-12-01',
    region: config.get<string>('region')
  })
});

export const conditions = [
  {
    path: 'type',
    value: 'email'
  }
];

export const action = createProcessorAction(
  async (message: Message, sendMessage: SendMessageFunction) => {
    const { data } = message;
    const { from, to, subject } = data;

    const template = readFileSync(
      path.join(
        __dirname,
        '../../resources/templates',
        `${data.templateName}.ejs`
      ),
      'utf8'
    );
    const html = ejs.render(template, data.data);

    const result = await transporter.sendMail({
      from,
      to,
      subject,
      html
    });
    return result;
  },
  true
);
