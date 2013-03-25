(function (windows, ko) {
    var knockouch = function (lib, options) {
        knockouch.options = options || {};
        selectTouchLibrary(lib);
    };

<<<<<<< HEAD
    knockouch.touchLibrary = {};
    knockouch.touch = {};
    knockouch.eventList = [];
=======
    knockouch.touchlibrarys = ['Hammer', 'Zepto'];
    knockouch.touchLibrary = {};
    knockouch.touch = {};
    knockouch.touchEvents = [];
    
>>>>>>> add support for non hammer type events

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
<<<<<<< HEAD
        for (i in knockouch.HammerOptions) {
            var optionName = knockouch.HammerOptions[i];
=======
        for (i in knockouch.hammerOptions) {
            var optionName = knockouch.hammerOptions[i];
>>>>>>> add support for non hammer type events
            if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                knockouch.options[optionName] = bindings[optionName];
            }
        }
        return options;
    };

<<<<<<< HEAD
=======
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

>>>>>>> add support for non hammer type events
    knockouch.HammerWrapper = function (element, touchEventName, handler, bindings) {
        var options = setMoreOptions(bindings);
        Hammer(element, options).on(touchEventName, handler);
    };

    knockouch.ZeptoWrapper = function (element, touchEventName, handler) {
<<<<<<< HEAD
        Zepto(element)[touchEventName](handler);
    };

    knockouch.touchlibrarys = ['Hammer', 'Zepto'];

    knockouch.HammerTouchEvents  = ['tap', 'doubletap', 'hold', 'rotate',
=======
        touchEventName = unifyEventName(touchEventName);
        Zepto(element)[touchEventName](handler);
    };

    knockouch.touchEvents  = ['tap', 'doubletap', 'hold', 'rotate',
>>>>>>> add support for non hammer type events
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];

<<<<<<< HEAD
    knockouch.ZeptoTouchEvents = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp',
                            'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap']

    knockouch.HammerOptions = ['doubletap_distance', 'doubletap_interval', 'drag',
=======
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
>>>>>>> add support for non hammer type events
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'];

<<<<<<< HEAD
    function init() {
        var library = knockouch.touchLibrary;
        knockouch.eventList = knockouch[library + "TouchEvents"];
        knockouch.touch = knockouch[library + "Wrapper"];
        for (i in knockouch.eventList) {
            var eventName = knockouch.eventList[i];
            makeTouchHandlerShortcut(eventName);
        }
    };
=======
    
>>>>>>> add support for non hammer type events

    window.knockouch = knockouch;
    searchTouchLibrary();

}(this, ko));