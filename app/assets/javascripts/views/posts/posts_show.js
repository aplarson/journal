Journal.Views.PostsShow = Backbone.View.extend({
  initialize: function (options) {
    this.model = options.model;
    this.listenTo(this.model, 'sync', this.render);
    this.$el.data('id', this.model.id);
    this.collection = options.collection;
  },
  
  events: {
    "dblclick .editable": 'openField',
    "blur .editing": "closeField"
  },
  
  template: JST["posts/show"],
  
  render: function () {
    var content = this.template({ post: this.model });
    this.$el.html(content);
    return this;
  },
  
  openField: function (event) {
    var $target = $(event.target);
    if ($target.hasClass('text')) {
      this.currentEditing = $target.replaceWith($('<input>')
                                   .val($target.text())
                                   .addClass('editing'));
    } else if ($target.hasClass('textarea')) {
     this.currentEditing = $target.replaceWith($('<textarea>')
                                  .val($target.text())
                                  .addClass('editing'));
    }
  },
  
  closeField: function (event) {
    var $target = $(event.target);
    $target.replaceWith(this.currentEditing.text($target.val()));
    var attribute = this.currentEditing.data('attribute');
    this.model.set(attribute, this.currentEditing.text());
    this.model.save({}, {
      success: function () {
        this.collection.set(this.model, { remove: false }); 
      }.bind(this)
    })
  }
});