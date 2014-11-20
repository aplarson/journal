Journal.Routers.Posts = Backbone.Router.extend({
  routes: {
    "": "root",
    "posts/new": "newPost",
    "posts/:id/edit": "editPost",
    "posts/:id": "showPost"
  },
  
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$sidebar = options.$sidebar;
    this.collection = options.collection;
    this.postsIndex();
  },
  
  postsIndex: function () {
    this.collection.fetch();
    var view = new Journal.Views.PostsIndex({ collection: this.collection });
    this.$sidebar.html(view.render().$el);
  },
  
  root: function () {
    this.$rootEl.empty()
  },
  
  showPost: function (id) {
    var post = this.collection.getOrFetch(id);
    var view = new Journal.Views.PostsShow({ model: post, collection: this.collection });
    this.$rootEl.html(view.render().$el);
  },
  
  newPost: function () {
    var post = new Journal.Models.Post();
    var view = new Journal.Views.PostsForm({ model: post, 
                                             collection: this.collection });
    this.$rootEl.html(view.render().$el);
  },
  
  editPost: function (id) {
    var post = this.collection.getOrFetch(id);
    var view = new Journal.Views.PostsForm({ model: post, 
                                             collection: this.collection });
    this.$rootEl.html(view.render().$el);
  }
});
