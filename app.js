var enumGenerator = require('./lib/enumgenerator');

enumGenerator.generate(function(err, result) {
    if (err) {
        console.error(err);
        return;
    }
    console.log(result);
});
