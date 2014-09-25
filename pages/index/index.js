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
ns.View.define('head');
ns.View.define('index');
