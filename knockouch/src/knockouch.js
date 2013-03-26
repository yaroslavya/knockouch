(function (windows, ko) {
    var knockouch = function (lib, options) {
        knockouch.options = options || {};
        knockouch.selectTouchLibrary(lib);
    };

    knockouch.touchlibrarys = ['Hammer', 'jQuery', 'Zepto'];
    knockouch.touchLibrary = "";
    knockouch.replacementEvents = {};
    knockouch.touch = {};
    
    
    knockouch.makeTouchHandlerShortcut = function(touchEventName) {
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var handler = valueAccessor();
                var allBindings = allBindingsAccessor();
                knockouch.touch(element, touchEventName, handler, allBindings);
            }
        };
    };

    knockouch.searchTouchLibrary = function() {
        for (i in knockouch.touchlibrarys) {
            var touchLibary = knockouch.touchlibrarys[i];
            if (window[touchLibary] !== undefined) {
                knockouch.selectTouchLibrary(touchLibary);
                break;
            }
        }
    };

    knockouch.selectTouchLibrary = function(library) {
        knockouch.touchLibrary = library;
        knockouch.init();
    };

    knockouch.init = function() {
        var library = knockouch.touchLibrary;
        knockouch.touch = knockouch[library + 'Wrapper'];
        knockouch.replacementEvents = knockouch[library + 'ReplacementEvents'];
        for (i in knockouch.touchEvents) {
            var eventName = knockouch.touchEvents[i];
            knockouch.makeTouchHandlerShortcut(eventName);
        }
    };

    knockouch.unifyEventName = function(eventName) {
        if (knockouch.replacementEvents[eventName] !== undefined) {
            return knockouch.replacementEvents[eventName];
        }
        else {
            throw "you've selected touch library not support " + eventName + ' event';
        }
    };

    knockouch.touchEvents  = ['tap', 'doubletap', 'hold', 'rotate',
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];

    //--------Hammer--------------
    knockouch.hammerOptions = ['doubletap_distance', 'doubletap_interval', 'drag',
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'];

    knockouch.setMoreOptions = function(bindings) {
        var options = knockouch.options;
        for (i in knockouch.hammerOptions) {
            var optionName = knockouch.hammerOptions[i];
            if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                knockouch.options[optionName] = bindings[optionName];
            }
        }
        return options;
    };

    knockouch.HammerWrapper = function (element, touchEventName, handler, bindings) {
        var options = knockouch.setMoreOptions(bindings);
        Hammer(element, options).on(touchEventName, handler);
    };

    //----------------------------

    //--------jQuery--------------
    knockouch.jQueryReplacementEvents = {
        'swipeleft': 'swipeLeft',
        'swiperight': 'swipeRight',
        'hold': 'taphold',
        'tap': 'tap',
        'swipe': 'swipe'
    };

    knockouch.jQueryWrapper = function (element, touchEventName, handler, bindings) {
        jQuery(element).bind(touchEventName, handler);
    };
    //----------------------------

    //--------Zepto---------------
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

    knockouch.ZeptoWrapper = function (element, touchEventName, handler) {
        touchEventName = knockouch.unifyEventName(touchEventName);
        Zepto(element)[touchEventName](handler);
    };

    //----------------------------
    window.knockouch = knockouch;
    knockouch.searchTouchLibrary();

}(this, ko));