STYLUS = node_modules/.bin/stylus
YATE = node_modules/.bin/yate

all: css yate

yate: pages/pages.yate.js

pages/pages.yate.js: pages/pages.yate
	$(YATE) $< > $@

css: css/all.css

css/all.css: css/all.styl
	$(STYLUS) --resolve-url css/all.styl

.PHONY: install all yate css


