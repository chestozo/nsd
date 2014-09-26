ns.router.routes.route = no.extend({
    '/photos/{image-id:int}': 'photo',
    '/photos': 'photo'
}, ns.router.routes.route);

ns.layout.define('photo', {
    'app content@': function(params) {
        if (params['image-id']) {
            return {
                'photos': null,
                'slideshow': null,
                'photo-preview-box@': 'photo-preview'
            };
        } else {
            return {
                'photos': null
            };
        }
    }
}, 'app');

ns.Model.define('photo', {
    params: {
        'image-id': null
    }
});

ns.Model.define('photos', {
    split: {
        items: '.images.image',
        model_id: 'photo',
        params: {
            'id': '.id'
        }
    }
});

ns.View.define('photos-item', {
    models: [ 'photo' ]
});

ns.ViewCollection.define('photos', {
    models: [ 'photos' ],
    split: {
        byModel: 'photos',
        intoViews: 'photos-item'
    },
    events: {
        'slideshow-show-next': 'showNextImage'
    },
    methods: {
        showNextImage: function() {
            var images = this.getModel('photos').models;
            var id = ns.page.current.params['image-id'];
            for (var i = 0; i < images.length; i++) {
                if (images[i].get('.id') == id) {
                    this._showImage(images[(i + 1) % images.length]);
                }
            }
        },
        _showImage: function(image) {
            ns.page.go(ns.router.generateUrl('photo', { 'image-id': image.get('.id') }));
        }
    }
});

ns.View.define('photo-preview', {
    models: [ 'photo' ]
});

ns.View.define('slideshow', {
    events: {
        'ns-view-init': 'onInit',
        'click .slideshow-play': 'toggleSlideshow'
    },
    methods: {
        onInit: function() {
            this.running = null;
            this.delay = 3000;
        },
        toggleSlideshow: function() {
            if (this.running) {
                clearTimeout(this.running);
                delete this.running
            } else {
                var that = this;
                var showNextSlide = function() {
                    ns.events.trigger('slideshow-show-next');
                    that.running = setTimeout(showNextSlide, that.delay);
                };
                that.running = setTimeout(showNextSlide, this.delay);
            }

            this.$node.find('.slideshow-play').toggleClass('slideshow-play-active', this.running);
        }
    }
});

// ----------------------------------------------------------------------------------------------------------------- //

var photos = ns.Model.get('photos').setData({ images: { image: [] } });

photos.insert([
    ns.Model.get('photo', { 'image-id': 4 }).setData({ id: 4, url_: 'http://img-fotki.yandex.ru/get/9329/27316011.2/0_daca2_13cf7df8_' }),
    ns.Model.get('photo', { 'image-id': 5 }).setData({ id: 5, url_: 'http://img-fotki.yandex.ru/get/4425/22805354.7/0_6114c_aaf2746c_' }),
    ns.Model.get('photo', { 'image-id': 2 }).setData({ id: 2, url_: 'http://img-fotki.yandex.ru/get/6736/10566499.dd/0_9342c_c2f06db9_' }),
    ns.Model.get('photo', { 'image-id': 3 }).setData({ id: 3, url_: 'http://img-fotki.yandex.ru/get/9759/202825749.e/0_da572_89ef5e92_' }),
    ns.Model.get('photo', { 'image-id': 1 }).setData({ id: 1, url_: 'http://img-fotki.yandex.ru/get/9835/131505588.d6/0_f43b7_53812e6e_' }),
]);
