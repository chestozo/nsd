ns.router.routes.route = no.extend({
    '/github/{login}': 'github-profile',
    '/github/': 'github-index'
}, ns.router.routes.route);

ns.layout.define('github-index', {
    'app content@': {
        'github-index': true
    }
}, 'app');

ns.layout.define('github-profile', {
    'app content@': {
        'github-profile': true,
        'github-issues': true
    }
}, 'app');

ns.Model.define('github-profile', {
    params: {
        'login': null
    },
    methods: {
        request: function() {
            return ns.http('https://api.github.com/users/{login}'.replace('{login}', this.params['login']), {}, { type: 'GET' })
                .then(function(data) {
                    this.setData(data);
                }, function(error) {
                    this.setError(error);
                }, this);
        }
    }
});

ns.Model.define('github-issue', {
    params: { id: null }
});

ns.Model.define('github-issues', {
    params: {
        'login': null
    },
    split: {
        items: '.',
        model_id: 'github-issue',
        params: {
            'id': '.number'
        }
    },
    methods: {
        request: function() {
            return ns.http('https://api.github.com/repos/yandex-ui/noscript/issues?creator={login}'.replace('{login}', this.params['login']), {}, { type: 'GET' })
                .then(function(data) {
                    this.setData(data);
                }, function(error) {
                    this.setError(error);
                }, this);
        }
    }
});

ns.View.define('github-index', {
    events: {
        'keydown input': 'onKeyDown'
    },
    methods: {
        onKeyDown: function(evt) {
            if (evt.which === 13) {
                ns.page.go(ns.router.generateUrl('github-profile', { login: this.$node.find('input').val() }));
            }
        }
    }
});

ns.View.define('github-profile', {
    models: [ 'github-profile' ]
});

ns.View.define('github-issue', {
    models: [ 'github-issue' ]
});

ns.ViewCollection.define('github-issues', {
    models: [ 'github-issues' ],
    split: {
        byModel: 'github-issues',
        intoViews: 'github-issue'
    }
});
