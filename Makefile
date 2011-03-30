all: build test

build: build-js build-objj build-harmony build-experimental
test: test-js test-objj test-harmony test-experimental

build-js:
	jison lib/js/grammar.jiy lib/js/lexer.jil
	mv grammar.js lib/js/parser.js
build-objj:
	jison lib/objj/grammar.jiy lib/objj/lexer.jil
	mv grammar.js lib/objj/parser.js
build-harmony:
	jison lib/harmony/grammar.jiy lib/harmony/lexer.jil
	mv grammar.js lib/harmony/parser.js
build-experimental:
	jison lib/experimental/grammar.jiy lib/experimental/lexer.jil
	mv grammar.js lib/experimental/parser.js

test-js:
	node tests/js-tests.js
test-objj:
	node tests/objj-tests.js
test-harmony:
	node tests/harmony-tests.js
test-experimental:
	node tests/experimental-tests.js

