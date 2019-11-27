
var typewriter = function () {
    var container = document.getElementById('typewriter');
    var txt = container.dataset.typewriter;

    while (true) {
        for (let letter of txt) {
            var speed = 100;

            type(container, letter, speed);
        }
        container.innerText = '';
    }

};


var type = function (container, letter, speed) {
    speed = speed || 100;
    setTimeout(function () {
        container.innerText += letter;
    }, speed)
};

window.onload = typewriter();