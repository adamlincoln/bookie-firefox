// This is an attempt to make http://meherranjan.com/blog/a-guide-to-using-jquery-inside-firefox-extension/
// work (approach 2).  This is used with bookie-core.js NOT included in the .xul file.  It looks like this works ok
// on its own, but I can't work out how to use the jQuery bit you get back to include useful stuff from
// bookie-core.js.
var bookie = (function(module) {
    module.init = (function(context) {
        var loader = Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(Components.interfaces.mozIJSSubScriptLoader);
        //loader.loadSubScript("chrome://bookie/content/js/jquery.min.js", context);
        loader.loadSubScript("chrome://bookie/content/js/jquery.min.js");
        loader.loadSubScript("chrome://bookie/content/js/bookie-core.js");

        this.$ = this.jQuery = jQuery.noConflict(true);

        module.consoleService = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
        // This works here just fine.  And if later you use the aConsoleService attribute, it works fine.
        module.consoleService.logStringMessage('Adding to bookie in bookie-firefox');

        //(function (module, $) {
            //module.test = 'bar';
        //})(this.bookie || {}, jQuery);
        //return this.bookie;

        // Here's some crap from that link above that I think we don't need right now.
        //if(typeof(jQuery.fn._init) == 'undefined') {
            //jQuery.fn._init = jQuery.fn.init;
        //}
        //this.jQuery = jQuery;
    });

    module.test = function() {
        alert(this.jQuery);
    };

    return module;
})(bookie || {});

//for (i in window) {
    //if (i.slice(0,1) == "B") {
        //aConsoleService.logStringMessage(i + ': ' + window[i]);
    //}
//}

// Here's some stuff that makes preferences behave in firefox.  Commented out while working on jQuery stuff.
/*var Bookie = {
    prefs: null,
    serverUrl: "",
    apiKey: "",

    startup: function()
    {
         this.prefs = Components.classes["@mozilla.org/preferences-service;1"]
             .getService(Components.interfaces.nsIPrefService)
             .getBranch("bookie.");
         this.prefs.QueryInterface(Components.interfaces.nsIPrefBranch2);
         this.prefs.addObserver("", this, false);

         this.serverUrl = this.prefs.getCharPref("server");
         this.apiKey = this.prefs.getCharPref("apikey");

    },    

    shutdown: function()
    {
        this.prefs.removeObserver("", this);
    },

    observe: function(subject, topic, data)
    {
        if (topic != "nsPref:changed")
        {
            return;
        }

        switch(data)
        {
            case "server":
                this.serverUrl = this.prefs.getCharPref("server");
                break;
            case "apikey":
                this.apiKey = this.prefs.getCharPref("apikey");
                break;
         }
    },

}

window.addEventListener("load", function(e) { Bookie.startup(); }, false);
window.addEventListener("unload", function(e) { Bookie.shutdown(); }, false);*/

