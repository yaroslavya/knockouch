(function (window, ko) {
    var knockouch = function (library, options) {
        knockouch.options = options || {};
        knockouch.selectTouchLibrary(library);
    };

    knockouch.touchLibrary = null;
    knockouch.touchLibraries = {};
    knockouch.touchEvents = ['tap', 'doubletap', 'hold', 'rotate',
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];
    
    knockouch.makeTouchHandlerShortcut = function(touchEventName) {
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var handler = valueAccessor();
                var allBindings = allBindingsAccessor();
                knockouch.touchLibrary.wrapper(element, touchEventName, handler, allBindings);
            }
        };
    };

    knockouch.searchTouchLibrary = function() {
        for (i in knockouch.touchLibraries) {
            var touchLibary = knockouch.touchLibraries[i];
            if (touchLibary.path !== undefined) {
                knockouch.touchLibrary = touchLibary;
                break;
            }
        }
        if (knockouch.touchLibrary === null) {
            throw "can't fined suitable library";
        }
    };

    knockouch.selectTouchLibrary = function (library) {
        if (knockouch.touchLibraries[library] !== undefined) {
            knockouch.touchLibrary = knockouch.touchLibraries[library];
        }
        else {
            throw 'failed to select a library ' + library +
            ' perhaps you misspelled her name or library ' + library +
            ' not support. Please refer to our documentation.';
        }
    };

    knockouch.unifyEventName = function (eventName, eventsRequiringReplacement) {
        if (eventsRequiringReplacement[eventName] !== undefined) {
            return eventsRequiringReplacement[eventName];
        }
        else {
            throw "you've selected touch library not support " + eventName + ' event';
        }
    };

    knockouch.init = function() {
        for (i in knockouch.touchEvents) {
            var eventName = knockouch.touchEvents[i];
            knockouch.makeTouchHandlerShortcut(eventName);
        }
        knockouch.searchTouchLibrary();
    };

    knockouch.touchLibraries.Hammer = {
        path: window.Hammer,
        optionsList : ['doubletap_distance', 'doubletap_interval', 'drag',
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'],
        setMoreOptions: function(bindings) {
            var extendedOptions = knockouch.options;
            for (i in this.optionsList) {
                var optionName = this.optionsList[i];
                if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                    knockouch.options[optionName] = bindings[optionName];
                }
            }
            return extendedOptions;
        },
        wrapper: function (element, touchEventName, handler, bindings) {
            var extendedOptions = this.setMoreOptions(bindings);
            Hammer(element, extendedOptions).on(touchEventName, handler);
        }
    };

    knockouch.touchLibraries.jQueryMobile = {
        path: window.jQuery.mobile,
        eventsRequiringReplacement: {
            'swipeleft': 'swipeLeft',
            'swiperight': 'swipeRight',
            'hold': 'taphold',
            'tap': 'tap',
            'swipe': 'swipe'
        },
        wrapper: function (element, touchEventName, handler) {
            touchEventName = knockouch.unifyEventName(touchEventName, this.eventsRequiringReplacement);
            jQuery(element).bind(touchEventName, handler);
        }
    };

    knockouch.touchLibraries.Zepto = {
        path: window.Zepto,
        eventsRequiringReplacement: {
            'swipeleft': 'swipeLeft',
            'swiperight': 'swipeRight',
            'swipeup': 'swipeUp',
            'swipedown': 'swipeDown',
            'doubletap': 'doubleTap',
            'hold': 'longTap',
            'tap': 'tap',
            'swipe': 'swipe'
        },
        wrapper: function (element, touchEventName, handler) {
            touchEventName = knockouch.unifyEventName(touchEventName,this.eventsRequiringReplacement);
            Zepto(element)[touchEventName](handler);
        }
    };

    knockouch.init();
    window.knockouch = knockouch;

}(this, ko));