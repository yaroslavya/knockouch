# knockouch.js

**Knockouch** is a javascript library that adds touch bindings to [knockoutjs](http://knockoutjs.com/) library. So you can work with touch events in knockout way.

## Features.

- Adds bindings for: tap, doubletap, hold, rotate, drag, transform, swipe, pinch

- By default works with any of 3 touch libraries: [hammer](https://github.com/EightMedia/hammer.js), [zepto](http://zeptojs.com/), [jquery.mobile](http://jquerymobile.com/). You can also add your own touch lib see details here.

- Detects touch library you are using automatically. You can also set specific library explicitly

## Getting started

You can download the sources from github or use [nuget](http://nuget.org/packages/knockouch/) or just type **Install-Package knockouch** in package manager console. Note, that nuget adds hammerjs as a default touch library.

## I just wanted to see some cool touch demos/how it works

Sure, you can have a look at [this](http://htmlpreview.github.com/?https://github.com/yaroslavya/knockouch/blob/master/knockouch/demo/iphone.html) in chrome and firefox only or [this](http://htmlpreview.github.io/?https://github.com/yaroslavya/knockouch/blob/dev/knockouch/demo/demoMobile.html) everywhere including the latest android and iphone. 

## Features coming soon

- AMD support

- More touch libraries to work with

- Various options and better tuning, like prevent interaction with click handlers if tap is there etc

## License

MIT license - [http://www.opensource.org/licenses/mit-license.php](http://www.opensource.org/licenses/mit-license.php)

