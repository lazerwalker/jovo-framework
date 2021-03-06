
import { App } from 'jovo-framework';


import { GoogleAssistant } from 'jovo-platform-googleassistant';
import { Alexa } from 'jovo-platform-alexa';
import { JovoDebugger } from 'jovo-plugin-debugger';
import { FileDb } from 'jovo-db-filedb';


const app = new App();

app.use(
    new GoogleAssistant(),
    new Alexa(),
    new JovoDebugger(),
    new FileDb(),
);

app.setHandler({
    async LAUNCH() {
        this.$speech!.addText('Hello');
        return this.toIntent('HelloWorldIntent');
    },
    HelloWorldIntent() {
        this.ask('Hello World! What\'s your name?', 'Please tell me your name.');
    },
    MyNameIsIntent() {
        this.$user!.$data.name = this.$inputs!.name.value;
        this.tell('Hey ' + this.$inputs!.name.value + ', nice to meet you!');
    },
    State: {
        MyNameIsIntent() {
            this.tell('Hello');
        }
    },
});


module.exports.app = app;
