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

      var queue = 'task_queue';
      //   var msg = 'Hello world';
      var msg = process.argv.slice(2).join(' ') || 'Hello World!';

      channel.assertQueue(queue, {
        durable: false,
      });
      //   channel.sendToQueue(queue, Buffer.from(msg));
      channel.sendToQueue(queue, Buffer.from(msg), {
        persistent: true,
      });

      console.log(' [x] Sent %s', msg);
    });
  });
}

main();
