no.extend(ns.router.routes.route, {
    '/photos/{image-id:int}': 'photo',
    '/photos': 'photo'
});

ns.layout.define('photo', {
    'app content@': function(params) {
        return params['image-id']
            ? { 'photos': null, 'photo-preview': null }
            : { 'photos': null };
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
    }
});

ns.View.define('photo-preview', {
    models: [ 'photo' ]
});

// ----------------------------------------------------------------------------------------------------------------- //

var photos = ns.Model.get('photos').setData({ images: { image: [] } });

photos.insert([
    ns.Model.get('photo', { 'image-id': 4 }).setData({ id: 4, url_: 'http://img-fotki.yandex.ru/get/9329/27316011.2/0_daca2_13cf7df8_' }),
    ns.Model.get('photo', { 'image-id': 5 }).setData({ id: 5, url_: 'http://img-fotki.yandex.ru/get/4425/22805354.7/0_6114c_aaf2746c_' }),
    ns.Model.get('photo', { 'image-id': 1 }).setData({ id: 1, url_: 'http://img-fotki.yandex.ru/get/9835/131505588.d6/0_f43b7_53812e6e_' }),
    ns.Model.get('photo', { 'image-id': 2 }).setData({ id: 2, url_: 'http://img-fotki.yandex.ru/get/6736/10566499.dd/0_9342c_c2f06db9_' }),
    ns.Model.get('photo', { 'image-id': 3 }).setData({ id: 3, url_: 'http://img-fotki.yandex.ru/get/9759/202825749.e/0_da572_89ef5e92_' }),

]);
