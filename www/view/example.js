import {button} from "./button.js";

export function output () {
    return `<p>Hello world!</p>

<div style="border: solid 1px;">
<a href="/test1">page 1<h5>h tag in link</h5></a>
</div>
<a href="/test2">page 2</a><br>
<a href="/test3/3/3">Broken link test</a><br>
<a href="https://devanew.com/" target="_blank">external link</a><br>

<button onclick="data.clicked = dataRaw.clicked + 1">
Clicked ${data.clicked} ${dataEvent({clicked: () => (dataRaw.clicked === 1 ?'time':'times') })}
</button>

<p>This is an ${dataEvent({clicked: () => (dataRaw.clicked % 2 === 0 ?'even':'odd') })} amount of times.</p>

<br>

${button({text:'test'})}
${button()}
${button({text:'reset',
        onClick: function (){data.clicked=0}
    })}


`
}
