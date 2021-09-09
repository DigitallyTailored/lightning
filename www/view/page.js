export function output (input = {}){
    input.title = input.title || `Page Title`
    input.content = input.content || `<p>Page content</p>`
    return `
<h1>${input.title}</h1>
<div class="page-content">${input.content}</div>
`
}