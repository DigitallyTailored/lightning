import {button as viewButton} from './view/button.js';
import {output as viewPage} from './view/page.js';
import {output as viewHeader} from './view/header.js';
import {output as exampleContent} from './view/example.js';
import {output as testString} from './view/testString.js';
import {data, dataRaw} from './lib/data.js';
import {script} from './lib/script.js';

//make data globally accessible
window.data = data
window.dataRaw = dataRaw

let client = {
    title: `My site`,
    body: window.document.body,
    init: function () {
        window.app = this //so that we can access the client from the console
        document.addEventListener('click', this.linkClick) //capture and attempt to process local routes
        client.linkProcess(window.location.pathname, true) //process current route
    },

    linkClick: function (event) {
        let link = event.target.closest('a')
        if (link && link.host === window.location.host) {
            event.preventDefault()
            client.linkProcess(link.pathname)
        }
    },
    linkProcess: function (path = window.location.pathname, initial = false) {
        let output = false

        //todo replace with routes file (which needs to be able to access the client/views)
        if (path === '/') {
            output = viewHeader() + viewPage({
                title: `Home`,
                content: exampleContent() + testString()
            })
        }
        if (path === '/test1') {
            output = viewHeader() + viewPage({
                title: `Page 1: some examples`,
                content: exampleContent()
            })
        }
        if (path === '/test2') {
            output = viewHeader() + viewPage({
                title: `Page 2: the very same examples`,
                content: `<p>This is a completely new page, but with the same example content:</p>`+exampleContent()
            })
        }

        history.pushState({}, null, window.location.origin + path);
        if (output) {
            this.body.innerHTML = output
            script.run() //todo check if this is safe
            //todo remove duplicate scripts? Scripts that have already been added
            //todo something similar for adding inline styles from components to prevent duplicates
        } else {
            this.body.innerHTML = viewHeader() + viewPage({
                title: `404`,
                content: `Page Not Found`
            })
        }

    }
};

data.liveTest = "test " + Date.now()
data.username = 'User'
data.clicked = 0

client.init()
