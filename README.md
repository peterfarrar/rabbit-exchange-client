# RabbitExchangeClient(s)

## This is based on the 4th and 5th tutorials on rabbitmq.com
I took the callback approach they presented and translated it into promises.  Then I built out classes and methods to implement them.  I hope the result is easy to use.  There is plenty of room for more classes and more variation to be introduced.

### Setup:
```
docker run -d -p 5672:5672 rabbitmq:latest
```
```
npm i amqplib
```
### Configuration
the `/config/local.sample.sh` file has good examples of how to set up your environment.  Copy these into a `/config/local.sh` file for these values to be pulled into option.js file.

In it's current state, the values in there are probably all you need, though you can play with them and see.  As it grows, there may need to be more added, and more variations for those already there.

### Commands
The `package.json` file contains three commands right now.  One to publish a message to a queue from the command line.  Two to listen on sample topics.  There's some crossover for the listeners where they should both receive the message on certain topics, and then there are exclusive topics.  These files are samples.  Play with them as you like!
```
npm run emit_log <topic> <message>
npm run log_listener
npm run error_listener
```
