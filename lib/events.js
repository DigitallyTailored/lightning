
let dataEvents = () => {}
let onEvents = {}

let eventsOn = new Proxy(dataEvents, {
    apply: function (target, thisArg, args) {
        let key = Object.keys(args[0])[0]
        onEvents[key] = onEvents[key] || []
        onEvents[key].push(args[0][key])
        return ` data-liveon="${key}" data-liveonindex="${onEvents[key].length - 1}" `

    },
})

let events = {
    init: function () {
        document.addEventListener('click', this.fired)
    },
    fired: function () {
        console.log(onEvents)
        onEvents.click[0]()
    }
}
export {events, eventsOn}