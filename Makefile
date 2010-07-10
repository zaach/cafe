all: build test

build: build-js build-obbj
test: test-js test-objj

build-js:
	jison lib/js/grammar.jiy lib/js/lexer.jil
	mv grammar.js lib/js/parser.js

build-obbj:
	jison lib/objj/grammar.jiy lib/objj/lexer.jil
	mv grammar.js lib/objj/parser.js

test-js:
	narwhal tests/js-tests.js
test-objj:
	narwhal tests/objj-tests.js
