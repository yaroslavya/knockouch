
(function (ko, touch) {
    function makeTouchHandlerShortcut(touchEventName) {        
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var handler = valueAccessor();
                Hammer(element).on(touchEventName, handler);
            }
        };
    };
    
    var touchEvents = ['tap', 'doubletap', 'hold', 'swipe', 'drag', 'transform'];
    for (var i = 0; i < touchEvents.length; i++) {
        var eventName = touchEvents[i];
        makeTouchHandlerShortcut(eventName);
    }

}(ko, Hammer));