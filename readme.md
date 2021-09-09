# What is this?

This is a very lightweight Node.js and mostly vanilla JS framework for very quickly serving templated content and static files.

I'm pretty sure this has been done many times before, but I'm keen to practice my JS and create a site framework with the simplest framework possible.

# Svelte-inspired

It is being created with Svelte in mind, but without the need for compilation.

Vanilla JS template using data listeners to live-update the page:
```javascript
<button onclick="data.clicked = dataRaw.clicked + 1">
    Clicked ${data.count} ${dataEvent({count: () => (dataRaw.count === 1 ?'time':'times') })}
</button>
```

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

It's not quite as pretty, but as it's all vanilla JS it should be easy to pick up. 

# Todo
There is so much that I want to add to this! My main goal is updating my core sites with this.

* Component styling handling (parsing?)
* Storing created dynamic elements at creation instead of searching for them when they need to be updated
* Building an event queue for components (instead of using `onclick="..."`)
* Proper routing defined separate of the app->linkProcess method
* Basic mime-type handling on the server, currently only supports js static files (very easy to add to though!)
* Some form of database or API access
* Some kind of theme layout definition so each route does not require `viewHeader() + viewPage() + viewFotter()` to be explicitly defined