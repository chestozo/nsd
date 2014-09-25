ns.router.routes = {
    route: {
        '/': 'index'
    }
};

ns.layout.define('app', {
    'app': {
        'head': true,
        'content@': {}
    }
});

ns.layout.define('index', {
    'app content@': 'index'
}, 'app');

ns.View.define('app');

ns.View.define('head', {
    events: {
        'click': 'goHome'
    },
    methods: {
        goHome: function() {
            ns.page.go(ns.router.generateUrl('index'));
        }
    }
});

ns.View.define('index');
