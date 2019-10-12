class Element {
    constructor (x, y, id) {
        // properties of this element
        this.active = true;
        this.x = x;
        this.y = y;
        this.id = id;
        this.selector = `#el-${id}`;
        this.content = '';
        this.object = $(`
            <g id="el-${id}" data-id="${id}" class="element">
                <circle sx="0" sy="0" r="40"></circle> 
                <path class="draggable section section-path" data-nth="1"></path>
                <text class="draggable section section-text" data-nth="1">1</text>
                <path class="draggable section section-path" data-nth="2"></path>
                <text class="draggable section section-text" data-nth="2">2</text>
                <path class="draggable section section-path" data-nth="3"></path>
                <text class="draggable section section-text" data-nth="3">3</text>
                <path class="draggable section section-path" data-nth="4"></path>
                <text class="draggable section section-text" data-nth="4">4</text>
                
                <foreignObject class="button" x="0" y="0" width="30" height="30" transform="translate(-80, -15)">
                    <button style="width: 100%; height: 100%;" class="button-element" data-action="delete">&times;</button>
                </foreignObject>
                
                <foreignObject class="button" x="0" y="0" width="30" height="30" transform="translate(50, -15)">
                    <button style="width: 100%; height: 100%;" class="button-element" data-action="edit" data-el-modal="modal-${id}">E</button>
                </foreignObject>
            </g>
            
            <foreignObject class="element-modal" id="modal-${id}" x="0" y="0" width="700" height="500" transform="translate(${sw/2 - 350 - 20}, ${sh/2 - 250 - 20}) scale(0)">
                <div class="element-modal-div"> 
                    <span class="modal-close">&times;</span>
                    <textarea style="width: 100%; height: 200px;" id="text-${this.id}">${this.content}</textarea>
                    
                    <div id="element-relations"></div>
                </div>
            </foreignObject>
        `);

        this.relations = [];

        // methods
        svg.append(this.object).html(svg.html());
        this.update();
        this.listen();
    }

    update () {
        $(this.selector)[0].setAttributeNS(null, 'transform', `translate(${this.x}, ${this.y}) scale(${ this.active ? '1' : '0' })`);
    }

    showModal () {
        $(`#modal-${this.id}`)[0].setAttributeNS(null, 'transition', 'all 0.5s');
        $(`#modal-${this.id}`)[0].setAttributeNS(null, 'transform', `translate(${sw/2 - 350 - 20}, ${sh/2 - 250 - 20}) scale(1)`);
        $(`#modal-${this.id} .element-modal-div`).css('transform', `scale(1)`);
    }

    hideModal () {
        $(`#modal-${this.id}`)[0].setAttributeNS(null, 'transition', 'all 0.5s');
        $(`#modal-${this.id} .element-modal-div`).css('transform', `scale(0)`);
        setTimeout(() => {
            $(`#modal-${this.id}`)[0].setAttributeNS(null, 'transform', `translate(${sw/2 - 350 - 20}, ${sh/2 - 250 - 20}) scale(0)`);
        }, 500)
    }

    listen () {
        let that = this;
        $(`#text-${this.id}`).on('change', function (e) {
            that.content = $(this).val();
        });

        $(`#modal-${this.id} .element-modal-div`).delegate('.modal-close', 'click', function (e) {
            that.hideModal();
        });
    }

    delete (that) {
        let element = that.elements[this.id];
        let lines = that.lines.filter((line) => {
            return line.el1.id == element.id || line.el2.id == element.id;
        });

        element.relations.forEach((relation) => {
            let el = relation.split('|')[0];
            let elSection = relation.split('|')[1];

            $(that.elements[el].selector + ' path.section').removeClass('have-relation');
        })

        lines.forEach((line, i) => {
            line.active = false;
        });
        this.active = false;

        that.factory.updateView();
    }

}