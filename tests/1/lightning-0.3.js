//Lightning Template - Realtime Frontend Template Library

window.lt = {
    init: () => {
        lt._templates = []
        window.addEventListener('load', () => {
            console.log("window loaded")
            //console.log(lt._templates)

            lt.interpret()
            lt.eventsPrepare()
        })
        console.log("lt loaded")
    },
    get: function (attr) {
        return document.querySelectorAll(attr)
    },
    eval: (data = '') => {
        //get function results with numbers
        //do math with numbers (=-*/^)
    },
    add: (name = '', template = ``) => {
        //add this template to the template library
        lt._templates[name] = template
    },
    interpret: () => {
        let templates = [];
        for (let key in lt._templates) {
            templates.push(key)
        }
        templates = templates.join()
        console.log(templates)
        let results = lt.get(templates)
        results = Array.from(results).reverse()
        console.log(results)
        results.forEach(element => {
            let data = []
            content = element.innerHTML
            content = content.split("\n").join("\\n")
            content = content.split("\"").join("\\\"")
            content = content.split("'").join("\"")
            if (content) {
                try {
                    data = JSON.parse("{" + content + "}")
                    //store original content first
                } catch (e) {
                    console.log("template definitions does not contain valid JSON: ", content)
                }
            }
            let output = lt.template(lt._templates[element.tagName.toLowerCase()], data)
            if (output !== element.innerHTML) {
                element.innerHTML = output
            }

        })

    },
    eventsPrepare: function () {
        let eventElements
        let events = ['click', 'change', 'keyup']
        let eventsCustom = ['enter']
        events.concat(eventsCustom).forEach((eventType) => {
            eventElements = lt.get(`[l-on-${eventType}]`)
            if (eventElements) {
                eventElements.forEach((element) => {
                    let event = element.getAttribute(`l-on-${eventType}`)
                    if (event) {
                        let alreadySetCheck = element.getAttribute(`l-on-${eventType}-ready`)
                        if (!alreadySetCheck || alreadySetCheck && alreadySetCheck !== event) {
                            element.setAttribute(`l-on-${eventType}-ready`, event)
                            event = event.split("(");
                            let attrString
                            if (typeof event[1] !== 'undefined') {
                                attrString = event[1].split(")")[0]
                            }
                            if (eventsCustom.includes(eventType)) {
                                switch (eventType) {
                                    case 'enter':
                                        element.addEventListener('keypress', function (e) {
                                            if (e.key === 'Enter') {
                                                let attr = []
                                                if (attrString) {
                                                    attr = lt.template(attrString, lt._data).split(',')
                                                }
                                                window[event[0]](...attr)
                                            }
                                        });
                                        break;
                                }

                            } else {
                                element.addEventListener(eventType, function () {
                                    let attr = []
                                    if (attrString) {
                                        attr = lt.template(attrString, lt._data).split(',')
                                    }
                                    window[event[0]](...attr)
                                })
                            }


                        }
                    }
                })
            }
        })

        eventElements = lt.get(`input[l-data]`)
        if (eventElements) {
            eventElements.forEach((element) => {
                let attribute = element.getAttribute(`l-data`)
                let alreadySetCheck = element.getAttribute(`l-on-input-ready`)
                if (!alreadySetCheck) {
                    element.setAttribute(`l-on-input-ready`, 'true')
                    element.addEventListener('keyup', function () {
                        data[attribute] = element.value
                    })
                }
            })
        }
    },
    template: function (template, variables, fallback) {
        let regex = /\${[^{]+}/g
        return template.replace(regex, (match) => {
            const path = match.slice(2, -1).trim();
            return this.templatePath(path, variables, fallback);
        });
    },
    templatePath: function (path, obj, fallback = '') {
        return path.split('.').reduce((res, key) => res[key] || fallback, obj);
    },
}
lt.init()