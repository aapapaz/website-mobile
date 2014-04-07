// Object Model
// ==============

// Includes file dependencies
define([ "jquery", 
         "backbone", 
         "collections/WidgetsCollection" ],

    function( $, Backbone, WidgetsCollection ) {

        // The Model constructor
        var ObjectModel = Backbone.Model.extend( {

            initialize: function() {
                
                this.widgets = new WidgetsCollection();
                this.widgets.parent = this;
            },

            url: function() {

                //
                var className=this.get('className');
                if (className=="topics")
                    className = "wbprocess";
                return WBMobile.defaults.BASE_URL + '/rest/widget/' 
                      + className + '/' + this.get('id') 
                      + '/overview?content-type=application/json';
            },

            getCacheKey: function() {
                var className=this.get('className');
                if (className=="topics")
                    className = "wbprocess";           

                return "Object" + ":" + className + ":" + this.get('id');
            },
        } );

        // Returns the Model class
        return ObjectModel;

    } 
);
