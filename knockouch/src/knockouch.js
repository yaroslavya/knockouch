﻿(function (window, ko) {
    var knockouch = function (library, options) {
        knockouch.options = options || {};
        knockouch.selectTouchLib(library);
    };

    knockouch.touchLib = null;
    knockouch.touchLibs = {};
    knockouch.touchEvents = ['tap', 'doubletap', 'hold', 'rotate',
                       'drag', 'dragleft', 'dragright', 'dragup',
                       'dragdown', 'transform', 'transformstart',
                       'transformend', 'swipe', 'swipeleft', 'swiperight',
                       'swipeup', 'swipedown', 'pinch', 'pinchin', 'pinchout'];

    knockouch.makeTouchHandlerShortcut = function (touchEventName) {
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor) {
                var handler = valueAccessor();
                var allBindings = allBindingsAccessor();
                knockouch.touchLib.wrapper(element, touchEventName, handler, allBindings);
            }
        };
    };

    knockouch.searchtouchLib = function () {
        for (i in knockouch.touchLibs) {
            var chosenLibrary = knockouch.touchLibs[i];
            if (chosenLibrary.isLoaded()) {
                knockouch.touchLib = chosenLibrary;
                break;
            }
        }
        if (knockouch.touchLib === null) {
            throw "could not find any touch library";
        }
    };

    knockouch.selectTouchLib = function (library) {
        if (knockouch.touchLibs[library].isLoaded()) {
            knockouch.touchLib = knockouch.touchLibs[library];
        }
        else {
            throw 'failed to select ' + library +
            ' check there`s no typos in ' + library +
            ' To make sure it`s supported refer to our documentation.';
        }
    };

    knockouch.unifyEventName = function (eventName, eventSubstitutes) {
        if (eventSubstitutes[eventName] !== undefined) {
            return eventSubstitutes[eventName];
        }
        else {
            throw "library you`ve selected doesn`t support " + eventName + ' event';
        }
    };

    knockouch.init = function () {
        for (i in knockouch.touchEvents) {
            var eventName = knockouch.touchEvents[i];
            knockouch.makeTouchHandlerShortcut(eventName);
        }
        knockouch.searchtouchLib();
    };

    knockouch.touchLibs.Hammer = {
        isLoaded: function () {
            return window.Hammer ? true : false;
        },
        optionsList: ['doubletap_distance', 'doubletap_interval', 'drag',
                        'drag_block_horizontal', 'drag_block_vertical', 'drag_lock_to_axis',
                        'drag_max_touches', 'drag_min_distance', 'hold',
                        'hold_threshold', 'hold_timeout', 'prevent_default',
                        'release', 'show_touches', 'stop_browser_behavior',
                        'swipe', 'swipe_max_touches', 'swipe_velocity',
                        'tap', 'tap_max_distance', 'tap_max_touchtime',
                        'touch', 'transform', 'transform_always_block',
                        'transform_min_rotation', 'transform_min_scale'],
        setMoreOptions: function (bindings) {
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

    knockouch.touchLibs.jQueryMobile = {
        isLoaded: function () {
            return window.jQuery.mobile ? true : false;
        },
        eventSubstitutes: {
            'swipeleft': 'swipeLeft',
            'swiperight': 'swipeRight',
            'hold': 'taphold',
            'tap': 'tap',
            'swipe': 'swipe'
        },
        wrapper: function (element, touchEventName, handler) {
            touchEventName = knockouch.unifyEventName(touchEventName, this.eventSubstitutes);
            jQuery(element).bind(touchEventName, handler);
        }
    };

    knockouch.touchLibs.Zepto = {
        isLoaded: function () {
            return window.Zepto ? true : false;
        },
        eventSubstitutes: {
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
            touchEventName = knockouch.unifyEventName(touchEventName, this.eventSubstitutes);
            Zepto(element)[touchEventName](handler);
        }
    };

    knockouch.init();
    window.knockouch = knockouch;

}(this, ko));