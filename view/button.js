export function button(input = {}) {
    input.text = input.text || 'Click'
    input.onClick = input.onClick || false //todo add to app-wide click listener
    return `<button>${input.text}</button>


`
}