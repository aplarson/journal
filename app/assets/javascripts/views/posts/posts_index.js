Journal.Views.PostsIndex = Backbone.View.extend({
  initialize: function () {
    this.listenTo(this.collection, 'remove add change:title reset', this.render);
  },  
  
  events: {
    'click button.delete-post': 'deletePost'
  },
  
  template: JST['posts/index'],
  
  render: function () {
    var content = this.template({ collection: this.collection });
    this.$el.html(content);
    return this;
  },
  
  deletePost: function (event) {
    var id = $(event.currentTarget).data('id');
    var post = this.collection.find({ id: id });
    post.destroy({
      success: function () {
        if ($('div#content div').data('id') === id) {
          Backbone.history.navigate("/", {trigger: true});
        }
      }
    });
  }
});