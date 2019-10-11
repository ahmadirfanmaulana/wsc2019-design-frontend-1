class Main {
    constructor () {
        // dom
        this.svg = $('#svg');
        this.elements = [];
        this.lines = [];

        // helper
        this.factory = new Factory(this);
        this.listen = new Listen(this);

        // methods
        this.init();
    }

    init () {
        this.generate();
        this.listener();
        this.update();
    }

    generate () {

        // create first element on center
        let el1 = this.factory.createElement(sw/2 - 20, sh/2 - 20);
        let el2 = this.factory.createElement(100, 100);

        this.factory.createLine(el1, el2, 3, 1);

    }

    listener () {

        // define listener
        this.svg.on('mousedown',  (e) => this.listen.mousedown(e));
        this.svg.on('mousemove',  (e) => this.listen.mousemove(e));
        this.svg.on('mouseup',    (e) => this.listen.mouseup(e));
        this.svg.on('mouseleave', (e) => this.listen.mouseleave(e));

    }

    update () {

        this.elements.forEach((element) => {
            element.update();
        });

        this.lines.forEach((line) => {
            line.update();
        });

        requestAnimationFrame(this.update.bind(this));

    }


}