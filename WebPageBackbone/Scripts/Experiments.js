$(function () {
    var menuList = $('.menu-list');
    var MenuItem = Backbone.Model.extend({
        defaults: {
            id: 0,
            title: 'Not defined',
            tabName: 'Not defined'
        }
    });
    
    var Tab = Backbone.Model.extend({
        defaults: {
            id: 0,
            name: ''
        }
    });

    var TabCollection = Backbone.Collection.extend({
       model: Tab 
    });

    var TabView = Backbone.View.extend({
        tagName: 'li',
        className: 'tab',
        events: {
          'click span': 'select'  
        },
        initialize: function () {
            _.bindAll(this, 'render', 'select');
        },
        render: function () {
            var span = $('<span>' + this.model.get('name') + '</span>'),
                div = $('<div class="tab-content">' + this.model.get('id') + '</div>');
            $(this.el).append(span).append(div);
            return this;
        },
        select: function (e) {
            var el = $(this.el);

            //deselect and hide all
            $('.tab>span').removeClass('selected');
            $('.tab-content').hide();

            el.find('span').addClass('selected');
            $(el).find('.tab-content').show();
        }
    });

    var TabCollectionView = Backbone.View.extend({
        el: $('.tabs'),
        tagName: 'ul',
        className: 'tabs',
        initialize: function () {
            _.bindAll(this, 'render', 'appendItem');

            this.collection = new TabCollection();
            this.collection.bind('add', this.appendItem);

            this._tabViews = [];
        },
        render: function () {
            var self = this;
            _(this.collection.models).each(function(item) {
                self.appendItem(item);
            }, this);
            return this;
        },
        addItem: function (item) {
            this.collection.add(item);
        },
        appendItem: function (item) {
            var tabViewItem = new TabView({
                model: item
            });
            $(this.el).append(tabViewItem.render().el);
            this._tabViews.push(tabViewItem);
        },
        openTab: function (id) {
            var tab = _.find(this._tabViews, function (item) {
                return item.model.get('id') == id;
            });
            if (tab) {
                tab.select();
                return true;
            } else {
                return false;
            }
        }
    });
    var tabCollectionView = new TabCollectionView();

    var MenuItemView = Backbone.View.extend({
        events: {
            'click span': 'addTab'
        },
        initialize: function () {
            _.bindAll(this, 'addTab');
        },
        addTab: function (e) {
            if (!tabCollectionView.openTab(this.model.get('id'))) {
                var newTab = new Tab({ id: this.model.get('id'), name: this.model.get('tabName') });
                tabCollectionView.addItem(newTab);
                tabCollectionView.openTab(this.model.get('id'))
            }
        }
    });

    menuList.find('li.menu-item').each(function (idx, el) {
        var listItem = $(this),
            id = listItem.data('id'),
            title = listItem.find('span').text(),
            tabName = listItem.data('tab'),
            menuItem = new MenuItem({ id: id, title: title, tabName: tabName }),
            menuItemView = new MenuItemView({ model: menuItem, el: el });
    });
});

var playWithCollection = function () {
    var Song = Backbone.Model.extend({
        defaults: {
            name: 'Not specified',
            artist: 'Not specified'
        },
        initialize: function() {
            console.log('Music is the answer!');
        }
    });

    var Album = Backbone.Collection.extend({
       model: Song 
    });

    var song1 = new Song({ name: 'fgsdfgsd', artist: 'asdfsdadfsdf' }),
        song2 = new Song({ name: 'dfgsdgsdf', artist: 'asdfsadfsfsgff' }),
        song3 = new Song({ name: 'dfgsdfgdf', artist: 'ghfdlgfldddfg' });

    var myAlbum = new Album([song1, song2, song3]);
    console.log(myAlbum.models);
};

var playWithRoute = function () {
    var AppRouter = Backbone.Router.extend({
        routes: {
            'post/:id': 'getPost',
            'download/*path': 'downloadFile',
            ':route/:action': 'loadView'
        }
    });

    var appRouter = new AppRouter;
    appRouter.on('route:getPost', function(id) {
        console.log('Get post number ' + id);
    });
    appRouter.on('route:downloadFile', function (path) {
        console.log('File path to download ' + path);
    });
    appRouter.on('route:loadView', function (route, action) {
        console.log(route, 'and', action);
    });

    Backbone.history.start();
};

var playWithView = function () {
    var SearchView = Backbone.View.extend({
        initialize: function () {
            this.render();
        },
        render: function () {
            var that = this;
            $.get('template/search', function (template) {
                that.$el.html(_.template($(template).html(), { search_label: "My search" }));
            });
            return this;
        },
        events: {
            'click input[type=button]': 'doSearch'
        },
        doSearch: function (e) {
            alert('Search for ' + $('#search_input').val());
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