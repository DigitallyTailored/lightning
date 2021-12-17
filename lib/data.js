
let dataRaw = () => {}
let dataFunction = {}
let data = new Proxy(dataRaw, {
    set: function (target, key, value) {
        target[key] = value
        let elements = document.querySelectorAll(`[data-livedata=${key}]`)
        elements.forEach((element) => {
            if (typeof value !== 'undefined') {
                element.innerHTML = value
            }
        });

        elements = document.querySelectorAll(`[data-liveevent=${key}]`);
        elements.forEach((element) => {
            if (typeof dataFunction[key] !== "undefined") {
                element.innerHTML = dataFunction[key][element.dataset.liveeventindex]()
            }
        });
        return true;
    },
    get: function (target, prop, receiver) {
        return `<span data-livedata="${prop}">` + (typeof target[prop] !== 'undefined' ? target[prop] : '') + `</span>`
    },
    apply: function (target, thisArg, args) {
        let key = Object.keys(args[0])[0]
        dataFunction[key] = dataFunction[key] || []
        dataFunction[key].push(args[0][key])
        return `<span data-liveevent="${key}" data-liveeventindex="${dataFunction[key].length - 1}" >${args[0][key]()}</span>`
    }
});


export {data, dataRaw}