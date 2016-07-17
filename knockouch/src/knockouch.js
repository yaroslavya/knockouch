(function (window, ko) {
﻿    
﻿   'use strict';
﻿   
    var knockouch = function (library, options) {
        knockouch.options = options || {};
        knockouch.setTouchLib(library);
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
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var handler = valueAccessor();
                var allBindings = allBindingsAccessor();
                
                var wrappedHandler = function(e) {
                    handler(viewModel, e);
                };
                
                knockouch.touchLib.wrapper(element, touchEventName, wrappedHandler, allBindings);
            }
        };
    };

    knockouch.searchTouchLib = function () {
        var touchlib;
    
        for (touchlib in knockouch.touchLibs) {
            if (knockouch.touchLibs.hasOwnProperty(touchlib) && knockouch.touchLibs[touchlib].isLoaded() ) {
                knockouch.touchLib = knockouch.touchLibs[touchlib];
                return;
            }
        }
    
        //TODO: there`s a case where lib was setup before and iteration over default touchLibs will not throw exception
        throw new ReferenceError('could not find any touch library');
    };
    
    //TODO: we need to put it into documentation on how to add another touch library
    knockouch.setTouchLib = function (library) {
        if (knockouch.touchLibs[library].isLoaded()) {
            knockouch.touchLib = knockouch.touchLibs[library];
        }
        else {
            throw new Error('failed to select ' + library +
            ' check there\'s no typos in ' + library +
            ' To make sure it\'s supported refer to our documentation.');
        }
    };

    knockouch.unifyEventName = function (eventName, eventSubstitutes) {
        if (eventSubstitutes[eventName] !== undefined) {
            return eventSubstitutes[eventName];
        }
        else {
            throw "library you've selected doesn't support " + eventName + ' event';
        }
    };

    knockouch.init = function () {
        var i;
        var eventName;
    
        for (i in knockouch.touchEvents) {
            if (knockouch.touchEvents.hasOwnProperty(i)) {
                eventName = knockouch.touchEvents[i];
                knockouch.makeTouchHandlerShortcut(eventName);
            }
        }
        knockouch.searchTouchLib();
    };

    /*
     *Wrappers to libraries that are used to provide touch handling. Currently hammer, zepto and jquery.mobile.
     *Every wrapper consists of the following: 
     * 1.method taht checks if library was loaded (isLoaded method by your captain obvious), 
     * 2.provide eventSubstitutes object that contains mapping 
     *   between library we need to use and knockouch and hammerjs events naming.
     * 3.wrapper function that provides unified interface to bind touch events for knockoutjs bindings.
     *   For details see knockouch.MakeTouchHandlerShortcut method.
     *
     * To add your own wrapper for touch library see our documentation
     */
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
            var i;
            var optionName;
    
            for (i in this.optionsList) {
                if (this.optionsList.hasOwnProperty(i)) {
                    optionName = this.optionsList[i];
                    if (bindings[optionName] !== undefined && bindings[optionName].constructor !== Function) {
                        knockouch.options[optionName] = bindings[optionName];
                    }
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
            return window.jQuery && window.jQuery.mobile ? true : false;
        },
        eventSubstitutes: {
            'swipeleft': 'swipeleft',
            'swiperight': 'swiperight',
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

    //Setting one of the predefined libraries as selected touch library.
    knockouch.init();
    
    window.knockouch = knockouch;

}(window, ko));
