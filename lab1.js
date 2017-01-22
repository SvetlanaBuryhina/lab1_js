var request = require('request');
var startPage = 'http://www.mosigra.ru/';
var urls = [];
var emails = [];
urls[0]=startPage;
var newUrl = urls[0];
console.log("Найденные e-mail'ы:");
request(newUrl, function (err, res, body) {
    if (err) throw err;
    for (var j = 0; j < 10; j++) {
        newUrl = urls[j];
        var https = body.match(/<a href="(http\:\/\/[-+\w.\/$#%]+)\"/ig);
        for (var i in https) {
            var url = https[i].substr(9, https[i].length - 10);
            if (url.startsWith(startPage))
                if (!(urls.includes(url))) {
                    urls.push(url);
                }
        }
        var nep = body.match(/<a href="(\/[-+\w:\/#@$.]*)\"/ig);
        for (var i in nep) {
            newUrl = startPage + nep[i].substr(10, nep[i].length - 11);
            if (!(urls.includes(newUrl))) {
                urls.push(newUrl);
            }
        }
        var email = body.match(/[a-zA-Z0-9][-_\w]+[.\w+]*\@[a-zA-Z0-9][-_a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}/ig);
        for (var i in email) {
            if (!(emails.includes(email[i]))) {
                emails.push(email[i]);
                console.log(email[i]);
            }
        }
    }
});