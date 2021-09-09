import {button as viewButton} from './view/button.js';
import {output as viewPage} from './view/page.js';
import {output as viewHeader} from './view/header.js';
import {output as exampleContent} from './view/example.js';
import {output as testString} from './view/testString.js';
import {data, dataEvent, dataFunction, dataRaw} from './data.js';

//make data globally accessible
window.data = data
window.dataEvent = dataEvent
window.dataFunction = dataFunction
window.dataRaw = dataRaw

let app = {
    title: `My site`,
    body: window.document.body,
    init: function () {
        window.app = this //so that we can access the app from the console
        document.addEventListener('click', this.linkClick) //capture and attempt to process local routes
        app.linkProcess(window.location.pathname, true) //process current route
    },

    linkClick: function (event) {
        let link = event.target.closest('a')
        if (link && link.host === window.location.host) {
            event.preventDefault()
            app.linkProcess(link.pathname)
        }
    },
    linkProcess: function (path = window.location.pathname, initial = false) {
        let output = false

        //todo replace with routes file (which needs to be able to access the app/views)
        if (path === '/') {
            output = viewHeader() + viewPage({
                title: `Home`,
                content: exampleContent() + testString()
            })
        }
        if (path === '/test1') {
            output = viewHeader() + viewPage({
                title: `Link 1 clicked!`,
                content: exampleContent()
            })
        }
        if (path === '/test2') {
            output = viewHeader() + viewPage({
                title: `Link 2 clicked!`,
                content: exampleContent()
            })
        }

        if (output) {
            this.body.innerHTML = output
            history.pushState({}, null, window.location.origin + path);
        } else {
            this.body.innerHTML = viewHeader() + viewPage({
                title: `404`,
                content: `Page Not Found`
            })
        }

    }
};

data.liveTest = "test " + Date.now()
data.clicked = 0

app.init()
