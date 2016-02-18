define([
    'jquery',
    './firstScript',
    'text!./poem.txt',
    'css!style/main.css',
    'domReady!',
], function($, firstScript, poem) {
    firstScript.hello();

    var p = new Promise((resolve, reject) => {
        resolve(100);
    });

    $(function() {
        console.log('jQuery OK');
        p.then(function() {
            console.log('Promise OK');
            $('#main').html(poem);
        });
    });
});
