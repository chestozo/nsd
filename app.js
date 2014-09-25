var app = {};

ns.page.title = function() {
    document.title = 'noscript talk';
};

yr.externals['get-current-page'] = function() {
    return ns.page.current;
};

app.init = function() {
    ns.init();
    ns.page.go();
};

$(function() {
    app.init();
});
