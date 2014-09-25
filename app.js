var app = {};

ns.page.title = function() {
    document.title = 'noscript talk';
};

app.init = function() {
    ns.init();
    ns.page.go();
};

$(function() {
    app.init();
});
