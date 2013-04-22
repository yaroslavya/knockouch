# knockouch.js

**Knockouch** is a javascript library that adds touch bindings to [knockoutjs](http://knockoutjs.com/) library. So you can work with touch events in knockout way.

## Features.

- Adds bindings for: tap, doubletap, hold, rotate, drag, transform, swipe, pinch

- Provides touch related event data, like distance, angle etc + knockout data.

- By default works with any of 3 touch libraries: [hammer](https://github.com/EightMedia/hammer.js), [zepto](http://zeptojs.com/), [jquery.mobile](http://jquerymobile.com/). You can also add your own touch lib see details here.

- Detects touch library you are using automatically. You can also set specific library explicitly

## Getting started

You can download the sources from github or use [nuget](http://nuget.org/packages/knockouch/) or just type **Install-Package knockouch** in package manager console. Note, that nuget adds hammerjs as a default touch library.

After adding knockouch you can just start using new touch bindings, like in the example below:
```html
<button data-bind="tap:tapHandler, hold:tapHandler, swipe:swipeHandler, doubletap:doubletapHandler">knockouch me</button>
```

And here is the knockoutjs model to handle it:
```javascript
//your knockoutjs view model:
var model = {
            someText: ko.observable('do something with'),
            tapHandler: function (data, e) {
				//Note, event types will be tap or hold, depending on what your action will be.
                model.someText('you just ' + e.type + 'ed.');
            },
			swipeHandler: function (data, e) {
                model.someText('you just swiped!!!');
            },
			doubletapHandler: function (data, e) {
                model.someText('doubletap goes here!!!');
            }
        };
		//applying bindings as usual
        ko.applyBindings(model);
```

## I just wanted to see some cool touch demos/how it works

Sure, you can have a look at [this](http://htmlpreview.github.com/?https://github.com/yaroslavya/knockouch/blob/master/knockouch/demo/iphone.html) in chrome and firefox only or [this](http://htmlpreview.github.io/?https://github.com/yaroslavya/knockouch/blob/dev/knockouch/demo/demoMobile.html) everywhere including the latest android and iphone. 

## Features coming soon

- More touch libraries to work with (quojs or touchpunch are planned).

- Various options and better tuning, like prevent interaction with click handlers if tap is there etc

- <del>Provides touch related event data, like distance, angle etc + knockout data.</del> was just added by user request.

## License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

