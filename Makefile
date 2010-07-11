all: build test

build: build-js build-obbj
test: test-js test-objj

build-js:
	jison lib/js/grammar.jiy lib/js/lexer.jil
	mv grammar.js lib/js/parser.js
build-obbj:
	jison lib/objj/grammar.jiy lib/objj/lexer.jil
	mv grammar.js lib/objj/parser.js
build-harmony:
	jison lib/harmony/grammar.jiy lib/harmony/lexer.jil
	mv grammar.js lib/harmony/parser.js

test-js:
	narwhal tests/js-tests.js
test-objj:
	narwhal tests/objj-tests.js
test-harmony:
	narwhal tests/harmony-tests.js
