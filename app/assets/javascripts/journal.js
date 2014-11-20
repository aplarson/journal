window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var collection = new Journal.Collections.Posts()
    var router = new Journal.Routers.Posts({ $rootEl: $('div#content'),
                                             collection: collection,
                                             $sidebar: $('div#sidebar')})
    Backbone.history.start()
  }
};

$(document).ready(function(){
  Journal.initialize();
});
