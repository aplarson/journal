Journal.Views.PostsForm = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    this.collection = options.collection;
    // this.listenTo(this.collection, 'error', this.addError);
    this.listenTo(this.model, 'error', this.addError);
    this.listenTo(this.model, 'sync', this.render);
  },
  
  events: {
    "submit form.post-form": "submitPostForm",
    "keyup .form-input": "removeError"
  },
  
  template: JST["posts/post_form"],
  
  removeError: function (event) {
    $(event.target).css('background-color', 'white')
  },
  
  addError: function (m, resp) {
    this.errors = resp.responseJSON;
    _.keys(this.errors).forEach(function (error) {
      this.$('#post_' + error).css('background-color', 'red')
    })
  },
  
  render: function () {
    var content = this.template({ post: this.model, text: "Create" });
    this.$el.html(content);
    return this;
  },
  
  submitPostForm: function (event) {
    event.preventDefault();
    var attributes = $(event.target).serializeJSON();
    var callback = function (model) {
      this.collection.add(this.model, {merge: true})
      Backbone.history.navigate("/posts/" + model.id, { trigger: true }); 
    }.bind(this);
    this.model.save(attributes.post, {
      success: callback
    })

    // this.collection.create(attributes["post"], {
//       success: callback,
//       wait: true,
//       error: function (collection, response) {
//         this.collection.trigger('error', collection, response)
//        }.bind(this)
//     });
  }
});

