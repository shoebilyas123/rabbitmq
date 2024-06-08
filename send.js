#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

async function main() {
  amqp.connect('amqp://localhost', (error0, conn) => {
    if (error0) {
      throw error0;
    }
    console.log('COnnected to RabbitMQ!\n');

    conn.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      var queue = 'hello';
      var msg = 'Hello world';

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.sendToQueue(queue, Buffer.from(msg));
      console.log(' [x] Sent %s', msg);
    });
  });
}

main();
