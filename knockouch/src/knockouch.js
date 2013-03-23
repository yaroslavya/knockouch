(function (windows, ko, touch) {
    var knockouch = function (lib, options) {
        knockouch.options = options || {};
        selectTouchLibrary(lib);
    };

    knockouch.touchLibrary = {};
    knockouch.touch = {};
    knockouch.eventList = [];
    knockouch.selectedLibrary = "";

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
        for (i in knockouch.HammerOptions) {
            var optionName = knockouch.HammerOptions[i];
            if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                knockouch.options[optionName] = bindings[optionName];
            }
        }
        return options;
    };

    knockouch.HammerWrapper = function (element, touchEventName, handler, bindings) {
        var options = setMoreOptions(bindings);
        Hammer(element, options).on(touchEventName, handler);
    };

    knockouch.ZeptoWrapper = function (element, touchEventName, handler) {
        Zepto(element)[touchEventName](handler);
    };

    knockouch.touchlibrarys = ['Hammer', 'Zepto'];

    knockouch.HammerTouchEvents  = ['tap', 'doubletap', 'hold', 'rotate',
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];

    knockouch.ZeptoTouchEvents = ['swipe', 'swipeLeft', 'swipeRight', 'swipeUp',
                            'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap']

    knockouch.HammerOptions = ['doubletap_distance', 'doubletap_interval', 'drag',
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'];

    function init() {
        var library = knockouch.touchLibrary;
        knockouch.eventList = knockouch[knockouch.touchLibrary + "TouchEvents"];
        knockouch.touch = knockouch[knockouch.touchLibrary + "Wrapper"];
        for (i in knockouch.eventList) {
            var eventName = knockouch.eventList[i];
            makeTouchHandlerShortcut(eventName);
        }
    };

    window.knockouch = knockouch;
    searchTouchLibrary();

}(this, ko, Hammer));