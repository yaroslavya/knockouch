
(function (ko, touch) {
    function hammerWrapper() {
        return Hammer;
    };
    
    function zeptoWrapper() {
        return {
            
        };
    };
    
    function getDefaultWrapper() {
        if (Hammer !== undefined){
            return hammerWrapper();
        }
        
        if (Zepto !== undefined) {
            return zeptoWrapper();
        }
    };
    
    function makeTouchHandlerShortcut(touchEventName) {        
        ko.bindingHandlers[touchEventName] = {
            init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
                var handler = valueAccessor();
                touch(element).on(touchEventName, handler);
            }
        };
    };
    
    var touchEvents = ['tap', 'doubletap', 'hold', 'rotate', 
                       'drag', 'dragleft', 'dragright', 'dragup', 'dragdown', 
                       'transform', 'transformstart', 'transformend', 
                       'swipe', 'swipeleft', 'swiperight', 'swipeup', 'swipedown', 
                       'pinch', 'pinchin', 'pinchout'];
    
    for (var i = 0; i < touchEvents.length; i++) {
        var eventName = touchEvents[i];
        makeTouchHandlerShortcut(eventName);
    }

}(ko, Hammer));