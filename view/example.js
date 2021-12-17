import {button} from "./button.js";

export function output() {
    return `<p>Hello world!</p>


<a href="/test1">Page 1</a><br>
<a href="/test2">Page 2</a><br>
<a href="/test3/3/3">Broken link</a><br>
<a href="https://devanew.com/" target="_blank">External link</a><br>

<h1>Hi, ${data.username}!</h1>
Name:<input type="text" name="username" onkeyup="data.username = this.value">


<script>
function handleClick(){
    data.clicked = dataRaw.clicked + 1
}
function handleClick2(){
    console.log('handleClick2')
    console.log(this)
}
</script>
<button onclick="handleClick()">
${data.username} Clicked ${data.clicked} ${data({clicked: () => (dataRaw.clicked === 1 ? 'time' : 'times')})}
</button>


<button onclick="data.clicked = dataRaw.clicked + 1">
${data.username} Clicked ${data.clicked} ${data({clicked: () => (dataRaw.clicked === 1 ? 'time' : 'times')})}
</button>

<button ${on({click: () => (handleClick2())})}>
${data.username} Clicked ${data.clicked} ${data({clicked: () => (dataRaw.clicked === 1 ? 'time' : 'times')})}
</button>

<br>
<button onclick="data.clicked = 0">
Reset
</button>
<br>

${data({clicked: () => (dataRaw.clicked % 2 === 0 ? `<button style="color: blue">Login as ${data.username}</button>` : `<button style="color: red">Logout from ${data.username}</button>`)})}

${data({
        clicked:
            function () {
                if (dataRaw.clicked % 2 === 0) {
                    return `<button style="color: blue">Login as ${data.username}</button>`
                } else {
                    return `<button style="color: red">Logout from ${data.username}</button>`
                }
            }

    })}


<!-- using a method to return a value and using the dataLive handler to return a value -->
<p>Click count * 10: ${data({clicked: () => (dataRaw.clicked * 10)})}</p>
<p>Click count: ${data.clicked}</p>


<p>This is an ${data({clicked: () => (dataRaw.clicked % 2 === 0 ? '<b style="color: red">even</b>' : '<b style="color: blue">odd</b>')})} amount of times.</p>
<p>${data({clicked: () => (dataRaw.clicked > 5 && dataRaw.clicked <= 10 ? '<a href="https://devanew.com/" target="_blank">OK OK stop clicking!</a>' : '')})}</p>
<p>${data({clicked: () => (dataRaw.clicked > 10 ? '<h3><a href="https://devanew.com/" target="_blank">Seriously?!</a></h3>' : '')})}</p>

<p>Click items:
<ul>
${data(
        {
            clicked: function () {
                let output = ''
                for (let i = 1; i < dataRaw.clicked + 1; i++) {
                    output += `<li>${data.username} clicked item #${i}${i === 3 ? ' Magic Number!' : ''}${i === 7 ? ' Lucky Number!' : ''}</li>
`
                }
                return output
            }
        }
    )}
</ul></p>

<hr>
<br>
<p>In development:</p>
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
