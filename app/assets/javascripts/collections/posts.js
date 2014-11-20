Journal.Collections.Posts = Backbone.Collection.extend({
  url: "/posts",
  model: Journal.Models.Post,

  getOrFetch: function(id) {
    var posts = this;
    var post = this.get(id);
    if (post) {
      post.fetch();
    } else {
      post = new Journal.Models.Post({ id: id });
      post.fetch({
        success: function() { posts.add(post); }
      });
    }
    return post;
  }
});
