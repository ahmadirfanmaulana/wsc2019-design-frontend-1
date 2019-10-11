class Element {
    constructor (x, y, id) {
        // properties of this element
        this.x = x;
        this.y = y;
        this.id = id;
        this.selector = `#el-${id}`;
        this.object = $(`
            <g id="el-${id}" data-id="${id}" class="element">
                <circle sx="0" sy="0" r="40"></circle> 
                <path class="draggable section section-path" data-nth="1"></path>
                <text class="draggable section section-text">1</text>
                <path class="draggable section section-path" data-nth="2"></path>
                <text class="draggable section section-text">2</text>
                <path class="draggable section section-path" data-nth="3"></path>
                <text class="draggable section section-text">3</text>
                <path class="draggable section section-path" data-nth="4"></path>
                <text class="draggable section section-text">4</text>
            </g>
        `);

        // methods
        svg.append(this.object).html(svg.html());
        this.update();
    }

    update () {
        $(this.selector)[0].setAttributeNS(null, 'transform', `translate(${this.x}, ${this.y})`)
    }
}