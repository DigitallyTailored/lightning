# What is Lightning :zap: ?

Lightning is a very lightweight Node.js and for the frontend, entirely vanilla JS framework for very quickly serving templated content and static files.

I'm pretty sure this has been done many times before, but I'm keen to practice my JS and create a site framework with the simplest implementation possible.

## Svelte-inspired

It is being created with Svelte in mind, but without the need for compilation.

Svelte template using data listeners to live-update the page:
```javascript
<script>
	function handleClick() {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	Clicked {count} {count === 1 ? 'time' : 'times'}
</button>
```

Lightning vanilla JS template using data listeners to live-update the page:
```javascript
<script>
    function handleClick(){
        data.clicked = dataRaw.clicked + 1
    }
</script>

<button onclick="handleClick()">
    Clicked ${data.clicked} ${data({clicked: () => (dataRaw.clicked === 1 ? 'time' : 'times')})}
</button>
```

It's not quite as pretty, but as it's all vanilla JS it should be easy to pick up.

## Dynamically updating content

I think one of the main benefits of a reactive framework is being able to specify where you want output or how you want data to be handled and then forgetting about it, allowing you to concentrate on the interface and the data logic more than the communication between your logic and the DOM.

With this in mind I have tried to emulate some basic reactive functionality while using frontend JS that does not require compilation in advance of deployment.

### Immediate output of updates
`data` has been defined as a Proxy which allows us to automatically update elements as soon as they're altered.

When we use a data value in a template, it actually returns an entire element which allows us to easily find that element later on:

As an example, in a template the following output:
```javascript
<h1>Hi, ${data.username}!</h1>
```
becomes:
```javascript
Hi, <span data-livedata="username">User</span>!
```
when the string is returned. We insert the default value initially and if we update this value, then we search the document for `data-livedata="username"` to update it. 

### Functions
There is also a function attached to the proxy allowing us to define functions to run when data is altered. 

A simple implementation where we run a function and output the result when `data.clicked` is updated:

```javascript
<p>Click count * 10: ${data({clicked: () => (dataRaw.clicked * 10)})}</p>
```
becomes:
```javascript
<p>Click count * 10: <span data-liveevent="clicked" data-liveeventindex="16">20</span></p>
```
Again, we are immediately outputting the result when we setup this element. You may notice that this also includes an index. This allows us to store multiple events against the same data: 
```javascript
<p>Click count * 10: ${data({clicked: () => (dataRaw.clicked * 10)})}</p>
<p>Click count * 100: ${data({clicked: () => (dataRaw.clicked * 100)})}</p>
<p>Click count + 5: ${data({clicked: () => (dataRaw.clicked + 5)})}</p>
```

This also supports more complex functions. Below is an example where we output a template based on multiple items, creating a templated for loop

```javascript
<ul>
${data(
        {
            clicked: function () {
                let output = ''
                for (let i = 1; i < dataRaw.clicked + 1; i++) {
                    output += `<li>${data.username} clicked item #${i}${i===3?' Magic Number!':''}${i===7?' Lucky Number!':''}</li>
`
                }
                return output
            }
        }
    )}
</ul>

```

A for loop block in Svelte (a different use-case but again, a bit clearer)
```javascript
<ul>
	{#each cats as { id, name }, i}
		<li><a target="_blank" href="https://www.youtube.com/watch?v={id}">
			{i + 1}: {name}
		</a></li>
	{/each}
</ul>
```

### Working with data

There are some limitations with data. To set a data value you must use the `data` variable:
```javascript
data.test = 'hello!'
```

When we directly retrieve this value, which should normally be done in a template, this will return an HTML element.
```javascript
<span data-livedata="test">hello!</span>
```

Instead, to retrieve this value for any logic you may need to run, you must use the `dataRaw` variable:
```javascript
dataRaw.test
// this will return 'hello!'
```

This means that if you work with an existing value, you will need to use two variables.
```javascript
data.counter = dataRaw.counter + 1
//increases data.counter by 1 and automatically runs any element updates or attached events
```

I may try to change this so that we can get and set from one object, though I need to look into this further. There is potentially a benefit to this though in that we can directly work with `dataRaw` and only set the `data` value when we want to run the attached updates.

# Setup
If you would like to run this locally then simple download the repository to your desired directory:

```git clone git@github.com:KohakuDoig/lightning.git```

and run either nodemon or node in the newly created folder:

```nodemon server.js``` - live file updates (faster development)

OR

```node server.js``` - how you would normally run this on a server (though Lightning is not production ready yet)

# Todo
There is so much that I want to add to this! My main goal is updating my core sites with something custom that runs very quickly.

* Component styling handling (parsing?)
* Storing created dynamic elements at creation instead of searching for them when they need to be updated
* Building an event queue for components (instead of using `onclick="..."`)
* Proper routing defined separate of the client->linkProcess method
* Basic mime-type handling on the server, currently only supports js static files (very easy to add to though!)
* Some form of database or API access
* Some kind of theme layout definition so each route does not require `viewHeader() + viewPage() + viewFooter()` to be explicitly defined