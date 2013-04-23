$(function () {
    playWithView();
});

var playWithView = function () {
    var SearchView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            var that = this;
            $.get('template/search', function(template){
                that.$el.html($(template).html());
            });
            return this;
        }
    });

    var searchView = new SearchView({ el: $('#search-container') });
};

var playWithModel = function () {
    var UserModel = Backbone.Model.extend({
        urlRoot: 'api/user',
        initialize: function () {
            this.bind("error", function (model, error) {
                console.log(error);
            });
        },
        validate: function (attributes) {
            if (attributes.age < 0 && attributes.name != "Dr Manhatten") {
                return "You can't be negative years old";
            }
        },
        defaults: {
            name: '',
            age: 0
        }
    });

    var user = new UserModel();
    user.set({ name: 'Thomas', age: -1 });
};