let dataRaw = {};

let data = new Proxy(dataRaw, {
    set: function (target, key, value) {
        target[key] = value
        //console.log(`${key} = ${value}`)
        //update all literal definitions
        let elements = document.querySelectorAll(`[data-livedata=${key}]`)
        elements.forEach((element) => {
            element.innerHTML = value
        });

        //run related localized events
        elements = document.querySelectorAll(`[data-liveevent=${key}]`); //get all events attached to this data
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
});

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