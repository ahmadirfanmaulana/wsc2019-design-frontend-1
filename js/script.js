window.onload = init();

function init () {
    svg = $('#svg');
    sh = svg.prop('scrollHeight');
    sw = svg.prop('scrollWidth');

    app = new Main();
}
