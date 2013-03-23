(function (windows, ko, touch) {
    var knockouch = function (lib, options) {
        knockouch.options = options || {};
        knockouch.touchLibrary = lib || Zepto || touch;
        init();
    },
    touch = {};

    function makeTouchHandlerShortcut(touchEventName) {
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var handler = valueAccessor();
                var allBindings = allBindingsAccessor();
                var options = setMoreOptions(allBindings);
                touch(element, touchEventName, handler, options);
            }
        };
    };

    function setMoreOptions(bindings) {
        var options = knockouch.options;
        for (i in hammerOptions) {
            var optionName = hammerOptions[i];
            if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                options[optionName] = bindings[optionName];
            }
        }
        return options;
    };

    var hammerTouchEvents  = ['tap', 'doubletap', 'hold', 'rotate',
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];

    var zeptoTouchEvents = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp',
                            'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap']

    var hammerOptions = ['doubletap_distance', 'doubletap_interval', 'drag',
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'];
    function init() {
        var eventsList = [];
        switch (knockouch.touchLibrary) {
            case Hammer: {
                eventsList = hammerTouchEvents;
                touch = function (element, touchEventName, handler, options) {
                    Hammer(element, options).on(touchEventName, handler);
                }
                break;
            }
            case Zepto: {
                eventsList = zeptoTouchEvents;
                touch = function (element, touchEventName, handler) {
                    Zepto(element)[touchEventName](handler);
                }
                break;
            }
        }
        for (i in eventsList) {
            var eventName = eventsList[i];
            makeTouchHandlerShortcut(eventName);
        }
    };

    window.knockouch = knockouch;

}(this, ko, Hammer));