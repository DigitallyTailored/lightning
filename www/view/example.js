import {button} from "./button.js";

export function output() {
    return `<p>Hello world!</p>

<div style="border: solid 1px;">
<a href="/test1">page 1<h5>h tag in link</h5></a>
</div>
<a href="/test2">page 2</a><br>
<a href="/test3/3/3">Broken link test</a><br>
<a href="https://devanew.com/" target="_blank">external link</a><br>

<button onclick="data.clicked = dataRaw.clicked + 1">
Clicked ${data.clicked} ${data({clicked: () => (dataRaw.clicked === 1 ? 'time' : 'times')})}
</button>

<button onclick="data.clicked = dataRaw.clicked + 1">
Clicked ${data.clicked} ${data({clicked: () => (dataRaw.clicked === 1 ? 'time' : 'times')})}
</button>

<!-- using a method to return a value and using the dataLive handler to return a value -->
<p>Click count: ${data({clicked: () => (dataRaw.clicked)})}</p>
<p>Click count: ${data.clicked}</p>
<p>Click count: ${data({clicked: () => (dataRaw.clicked)})}</p>

<p>Click items:
<ul>
${data(
        {
            clicked: function () {
                let output = ''
                for (let i = 1; i < dataRaw.clicked + 1; i++) {
                    output += `<li>click ${i}</li>`
                }
                return output
            }
        }
    )}
</ul></p>

<p>This is an ${data({clicked: () => (dataRaw.clicked % 2 === 0 ? 'even' : 'odd')})} amount of times.</p>
<p>${data({clicked: () => (dataRaw.clicked > 10 && dataRaw.clicked <= 20 ? '<a href="https://devanew.com/" target="_blank">OK OK stop clicking!</a>' : '')})}</p>
<p>${data({clicked: () => (dataRaw.clicked > 20 ? '<h3><a href="https://devanew.com/" target="_blank">Seriously?!</a></h3>' : '')})}</p>


<button onclick="data.clicked = 0">
Reset
</button>

<br>

${button({text: 'test'})}
${button()}

<!--
${button({
        text: 'reset',
        onClick: function () {
            data.clicked = 0
        }
    })}
-->

`
}
