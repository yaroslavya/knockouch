(function (windows, ko) {
    var knockouch = function (lib, options) {
        knockouch.options = options || {};
        selectTouchLibrary(lib);
    };

    knockouch.touchlibrarys = ['Hammer', 'Zepto'];
    knockouch.touchLibrary = {};
    knockouch.touch = {};
    knockouch.touchEvents = [];
    


    function makeTouchHandlerShortcut(touchEventName) {
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var handler = valueAccessor();
                var allBindings = allBindingsAccessor();
                knockouch.touch(element, touchEventName, handler, allBindings);
            }
        };
    };

    function searchTouchLibrary() {
        for (i in knockouch.touchlibrarys) {
            var touchLibary = knockouch.touchlibrarys[i];
            if (window[touchLibary] !== undefined) {
                selectTouchLibrary(touchLibary);
                break;
            }
        }
    };

    function selectTouchLibrary(library) {
        knockouch.touchLibrary = library;
        init();
    };

    function setMoreOptions(bindings) {
        var options = knockouch.options;
        for (i in knockouch.hammerOptions) {
            var optionName = knockouch.hammerOptions[i];
            if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                knockouch.options[optionName] = bindings[optionName];
            }
        }
        return options;
    };

    function init() {
        var library = knockouch.touchLibrary;
        knockouch.touch = knockouch[library + "Wrapper"];
        for (i in knockouch.touchEvents) {
            var eventName = knockouch.touchEvents[i];
            makeTouchHandlerShortcut(eventName);
        }
    };

    function unifyEventName(eventName) {
        if (knockouch.ZeptoReplacementEvents[eventName] !== undefined) {
            return knockouch.ZeptoReplacementEvents[eventName];
        }
        else {
            throw "you've selected touch library not support " + eventName + " event";
        }
    };

    knockouch.HammerWrapper = function (element, touchEventName, handler, bindings) {
        var options = setMoreOptions(bindings);
        Hammer(element, options).on(touchEventName, handler);
    };

    knockouch.ZeptoWrapper = function (element, touchEventName, handler) {
        touchEventName = unifyEventName(touchEventName);
        Zepto(element)[touchEventName](handler);
    };

    knockouch.touchEvents  = ['tap', 'doubletap', 'hold', 'rotate',
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];

    knockouch.ZeptoReplacementEvents = {
        'swipeleft': 'swipeLeft',
        'swiperight': 'swipeRight',
        'swipeup': 'swipeUp',
        'swipedown': 'swipeDown',
        'doubletap': 'doubleTap',
        'hold': 'longTap',
        'tap': 'tap',
        'swipe': 'swipe'
    };

    knockouch.hammerOptions = ['doubletap_distance', 'doubletap_interval', 'drag',
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'];


    window.knockouch = knockouch;
    searchTouchLibrary();

}(this, ko));