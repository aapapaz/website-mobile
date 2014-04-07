// Sets the require.js configuration for the application.
require.config( {

      // 3rd party script alias names
      paths: {

          // Core Libraries
          "jquery":         "libs/jquery-1.10.2.min",
          "jquerymobile":   "libs/jquery.mobile-1.3.2.min",
          "underscore":     "libs/underscore-min",
          "backbone":       "libs/backbone-min",
          "text":           "libs/text",
          "fetchcache":     "libs/backbone.fetch-cache",
          "pluralize":      "libs/pluralize",
          "spin":           "libs/spin.min",
          "jquerySpin":     "libs/jquery.spin",
          "fastclick":      "libs/fastclick.min"
      },

      // Sets the configuration for third party scripts that are not AMD compatible
      shim: {

            "backbone": {
                "deps": [ "underscore", "jquery" ],
                "exports": "Backbone"  //attaches "Backbone" to the window object
            },

            "underscore": {
                "exports": "_"
            },

            "pluralize": {
                "exports": "owl"
            },
      }, 

      // For development purposes , this prevents require.js from caching scripts
      urlArgs: "timestamp=" + (new Date()).getTime()
} );

// Includes File Dependencies
require([ "jquery", "backbone", "routers/mobileRouter", "fetchcache", "app", "fastclick" ], function( $, Backbone, MobileRouter ) {

    // Set up the "mobileinit" handler before requiring jQuery Mobile's module
    $( document ).on( "mobileinit", function() {

        // Disable jQM routing and component creation events
            // disable hash-routing
            $.mobile.hashListeningEnabled = false;
            // disable anchor-control
            $.mobile.linkBindingEnabled = false;
            // can cause calling object creation twice and back button issues are solved
            $.mobile.ajaxEnabled = false;
            // we want to handle caching and cleaning the DOM ourselves
            $.mobile.page.prototype.options.domCache = false;

        // consider due to compatibility issues
            // not supported by all browsers
            $.mobile.pushStateEnabled = false;
            // Solves phonegap issues with the back-button
            $.mobile.phonegapNavigationEnabled = true;

        $.mobile.defaultPageTransition = "slide";

        FastClick.attach(document.body);
    } );

    require( [ "jquerymobile" ], function() {

        // set to true if server cannot handle HTTP PUT or HTTP DELETE
        Backbone.emulateHTTP = true;

        // set to true if server cannot handle application/json requests
        Backbone.emulateJSON = false;

        // Define custom cache keys
        Backbone.fetchCache.getCacheKey = function(instance, options) {

            try {
                return instance.getCacheKey();
            }
            catch(err) {
                return;
            }
        };

        // Instantiates a new Backbone.js Mobile Router
        WBMobile.routers.mobile = new MobileRouter();
    } );
} );