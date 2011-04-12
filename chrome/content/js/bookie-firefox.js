window.addEventListener("load", function(event){
    (function(loader){
        loader.loadSubScript("chrome://bookie/content/js/jquery.min.js");
    })(
        Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(
            Components.interfaces.mozIJSSubScriptLoader
        )
    );

    

}, false);
