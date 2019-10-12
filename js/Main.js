class Main {
    constructor () {
        // define
        this.state = ['design', 'presentation'];

        // dom
        this.svg = $('#svg');
        this.view = $('#view');
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

    }

    listener () {

        // define listener
        this.svg.on('mousedown',  (e) => this.listen.mousedown(e));
        this.svg.on('mousemove',  (e) => this.listen.mousemove(e));
        this.svg.on('mouseup',    (e) => this.listen.mouseup(e));
        this.svg.on('mouseleave', (e) => this.listen.mouseleave(e));
        this.svg.on('click', (e) => this.listen.click(e));

        $('#button-design').click( (e) => this.changeState(e, 0) );
        $('#button-presentation').click( (e) => this.changeState(e, 1) );

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

    changeState (e, index) {
        let state = this.state[index];
        let button = $(e.target);

        // remove class from all buttons
        $('button.button-hut').removeClass('active');

        if (state == 'design') {
            this.view.removeClass('active');
            this.svg.addClass('active');

            button.addClass('active');
        } else {
            this.svg.removeClass('active');
            this.view.addClass('active');

            button.addClass('active');
        }
    }


}