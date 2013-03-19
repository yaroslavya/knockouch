(function (ko, touch) {
    function makeTouchHandlerShortcut(touchEventName) {
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var handler = valueAccessor();
                var allBindings = allBindingsAccessor();
                var options = getOptions(allBindings);
                Hammer(element, options).on(touchEventName, handler);
            }
        };
    };

    function getOptions(bindings) {
        var options = {};
        for (i in touchOptions) {
            var optionName = touchOptions[i];
            if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                options[optionName] = bindings[optionName];
            }
        }
        return options;
    };

    var touchEvents = ['tap', 'doubletap', 'hold', 'rotate',
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];

    var touchOptions = ['doubletap_distance', 'doubletap_interval', 'drag',
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'];

    for (i in touchEvents) {
        var eventName = touchEvents[i];
        makeTouchHandlerShortcut(eventName);
    }

}(ko, Hammer));