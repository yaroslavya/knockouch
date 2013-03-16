
(function (ko, touch) {
    //TODO: wrap everything in a loop for every gesture. After that we will be able to add all gestures at once.
    ko.bindingHandlers.tap = {
        init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //TODO:also make sure we are providing the event data to the handler to react smartly.
            var handler = valueAccessor();
            Hammer(element).on('tap', handler);
        },
        update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
            //TODO: we can make some tricky way to unregister any handlers here. 
        }
    };
}(ko, Hammer));