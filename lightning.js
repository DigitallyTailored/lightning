window.lt = {
    _data: () => {
    },
    //make undefined data return an empty string - useful for dynamic templates
    safe: (in_data = undefined, replace = "") => {
        if(typeof(in_data) === "undefined"){
            return ''
        } else {
            return replace
        }
    },
    s : (in_data, replace = "") => {
        return this.safe(in_data, replace)
    },
    depth: 0,
    initialized: false,
    init: function () {
        if (!this.initialized) {
            this.templatePrepare()
            this.dataPrepare()
            this.eventsPrepare()
            this.log('lightning loaded')
        }
    },
    renderDataItem: function (key, value) {
        lt.depth++

        let elements = lt.get('[l-data]')
        elements.forEach((element) => {
            if (element.getAttribute("l-data") === key) {
                if (element.tagName === "INPUT") {
                    element.value = value
                } else {
                    element.innerHTML = value
                }
            }
        });

        let loops = lt.get('[l-each]')
        loops.forEach((element) => {
            let variable = element.getAttribute("l-each")
            let template = element.getAttribute("l-template")
            if (typeof lt._data[variable] !== 'undefined') {
                let output = ''
                lt._data[variable].forEach((item, index) => {
                    item._this = item
                    item._id = index.toString()
                    item._number = index + 1
                    output += lt.template(template, item)
                })
                element.innerHTML = output
            }
        })

        let use = lt.get('[l-use]')
        use.forEach((element) => {
            let variable = element.getAttribute("l-use")
            let template = element.getAttribute("l-template")
            if (typeof lt._data[variable] !== 'undefined') {
                let item = lt._data[variable]
                item._this = item
                element.innerHTML = lt.template(template, item)
            }

        })

        lt.eventsPrepare()
        lt.depth--
    },
    dataPrepare: function () {
        let handler = {
            get: function (target, key) {
                lt.init()
                const value = target[key];
                let result = value
                let valueType = typeof value
                if (valueType === 'object' || valueType === 'function' && key !== 'constructor') {
                    result = typeof value == "object" ? new Proxy(value, handler) : value;
                }
                return result;
            },
            set: function (target, key, value) {
                lt.init()
                target[key] = value
                if (lt.depth === 0) {
                    lt.renderDataItem(key, value)
                }

                return true;
            },
            apply: function (target, thisArg, argumentsList) {
                lt.init()
                data.update = true
            }
        }
        window.data = new Proxy(this._data, handler);

    },
    templatePrepare: function () {
        let templateElements = lt.get('[l-use],[l-each]')
        templateElements.forEach((element) => {
            let template = element.getAttribute("l-template")
            if (!template) {
                element.setAttribute("l-template", element.innerHTML)
                element.innerHTML = ""
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
    get: function (attr) {
        return document.querySelectorAll(attr)
    },
    log: function (attr, color = 'purple') {
        console.log('%c - ' + attr, 'color: ' + color)
    }
}
lt.init()

/*
document.addEventListener("DOMContentLoaded", function () {
    if(!lt){
        lt.init()
    }
});
 */