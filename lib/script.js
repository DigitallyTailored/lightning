export let script = {
insert: function(embedScript, callback) {
    let s = document.createElement("script");
    s.type = "text/javascript";
    if (embedScript.src) {
        s.onload = callback;
        s.onerror = callback;
        s.src = embedScript.src;
    } else {
        s.textContent = embedScript.innerText;
    }

    // re-insert the script tag so it executes.
    document.head.appendChild(s);

    // clean-up - ensures scripts are only ran once on entry
    embedScript.parentNode.removeChild(embedScript);

    // run the callback immediately for inline scripts
    if (!embedScript.src) {
        callback();
    }
}
,
types: [
    "application/javascript",
    "application/ecmascript",
    "application/x-ecmascript",
    "application/x-javascript",
    "text/ecmascript",
    "text/javascript",
    "text/javascript1.0",
    "text/javascript1.1",
    "text/javascript1.2",
    "text/javascript1.3",
    "text/javascript1.4",
    "text/javascript1.5",
    "text/jscript",
    "text/livescript",
    "text/x-ecmascript",
    "text/x-javascript",
],

    run: function (container = document.body) {
    // get scripts tags from a node
    let embedScripts = container.querySelectorAll("script");
    let runList      = [];
    let typeAttr;

    [].forEach.call(embedScripts, function (embedScript) {
        typeAttr = embedScript.getAttribute("type");

        // only run script tags without the type attribute
        // or with a javascript mime attribute value
        if (!typeAttr || this.types.indexOf(typeAttr) !== -1) {
            runList.push(function (callback) {
                script.insert(embedScript, callback);
            });
        }
    });

    // insert the script tags sequentially
    // to preserve execution order
    this.sequence(runList, this.done);
},    sequence: function (arr, callback, index) {
        if (arr.length > 0) {
            // first call, without an index
            if (typeof index === "undefined") {
                index = 0;
            }

            arr[index](function () {
                index++;
                if (index === arr.length) {
                    callback();
                } else {
                    if (index)
                        this.sequence(arr, callback, index);
                }
            });
        }
    },
    done: function() {
        let DOMContentLoadedEvent = document.createEvent("Event");
        DOMContentLoadedEvent.initEvent("DOMContentLoaded", true, true);
        document.dispatchEvent(DOMContentLoadedEvent);
    }
}