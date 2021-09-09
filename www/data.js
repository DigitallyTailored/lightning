
let dataRaw = () => {},
    handler = {
        set: function (target, key, value) {
            target[key] = value
            let elements = document.querySelectorAll(`[data-livedata=${key}]`)
            elements.forEach((element) => {
                element.innerHTML = value
            });

            elements = document.querySelectorAll(`[data-liveevent=${key}]`);
            elements.forEach((element) => {
                if(typeof dataFunction[key] !== "undefined"){
                    element.innerHTML = dataFunction[key][element.dataset.liveeventindex]()
                }
            });
            return true;
        },
        get: function (target, prop, receiver) {
            return `<span data-livedata="${prop}">`+target[prop]+`</span>`
        },
        apply: function (target, thisArg, args) {

            console.log(args)
            let key = Object.keys(args[0])[0]
            dataFunction[key] = dataFunction[key] || []
            dataFunction[key].push(args[0][key])
            return `<span data-liveevent="${key}" data-liveeventindex="${dataFunction[key].length-1}" >${args[0][key]()}</span>`
        }
}
let data = new Proxy(dataRaw, handler);
//data(); // 42




let dataFunction = {}
let dataEvent = function (input = {}){
    console.log('dataEvent')
    console.log(input)
    let key = Object.keys(input)[0]
    dataFunction[key] = dataFunction[key] || []
    dataFunction[key].push(input[key])
    return `<span data-liveevent="${key}" data-liveeventindex="${dataFunction[key].length-1}" >${input[key]()}</span>`
}

export {data, dataEvent, dataFunction, dataRaw}