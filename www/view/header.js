export function output(input = {}) {
    input.title = input.title || `My Site Template`
    return `
<div><a href="/"><h1>${input.title}</h1></a>
<p>${data.liveTest}</p>
</div>
<style>
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
    
    html{
        font-family:sans-serif;
        color: #353535;
        font-size: 1em;
    }
    /*
    body {
        margin: 0;
    }
     */
    button {
        background-color: #b1d2fd;
        border-radius: 5px;
        border: 0;
        box-shadow: 0 0 4px #00000030;
        padding: 5px 10px;
        margin: 5px;
    }
    a, a:visited{
        text-decoration: none;
        color: #1573ec;
    }
    a[target="_blank"]:after {
        content: ' [+]';
        font-size: 0.5em;
        vertical-align: top;
    }
    
</style>
`
}