window.addEventListener("load", function(event){
    (function(loader){
        loader.loadSubScript("chrome://bookie/content/js/jquery.min.js");
    })(
        Components.classes["@mozilla.org/moz/jssubscript-loader;1"].getService(
            Components.interfaces.mozIJSSubScriptLoader
        )
    );

    var Bookie = {
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

             //this.refreshInformation();
             //window.setInterval(this.refreshInformation, 10*60*1000);

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
    window.addEventListener("unload", function(e) { Bookie.shutdown(); }, false);

}, false);
