export function output(input = {}) {
    input.string = input.string || 'test'
    return "`hi ${input.string}`"
}