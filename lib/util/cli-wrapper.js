var cafe = require('../cafe');
    IO = require('./io');

exports.main = function (argv) {
    var args = argv.slice(1);

    if (args.length) {
        var raw = IO.read(IO.resolve(IO.cwd()+'/',IO.normalize(args[1])));
        if (args[0] in cafe) {
            IO.stdout(cafe[args[0]].cliCompile(raw));
        } else {
            IO.stdout(cafe.js.cliCompile(raw));
        }
    } else {
        var read = false;
        IO.stdin(function (raw) {
            read = true;
            IO.stdout(cafe.js.cliCompile(raw));
        });
        setTimeout(function (){if (!read)IO.exit()}, 100);
    }
}

if (typeof process !== 'undefined' || require.main === module)
    exports.main(IO.args);
