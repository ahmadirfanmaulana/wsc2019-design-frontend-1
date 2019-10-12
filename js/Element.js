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
                <text class="draggable section section-text" data-nth="1">1</text>
                <path class="draggable section section-path" data-nth="2"></path>
                <text class="draggable section section-text" data-nth="2">2</text>
                <path class="draggable section section-path" data-nth="3"></path>
                <text class="draggable section section-text" data-nth="3">3</text>
                <path class="draggable section section-path" data-nth="4"></path>
                <text class="draggable section section-text" data-nth="4">4</text>
                
                <foreignObject class="button" x="0" y="0" width="30" height="30" transform="translate(-80, -15)">
                    <button style="width: 100%; height: 100%;">&times;</button>
                </foreignObject>
                
                <foreignObject class="button" x="0" y="0" width="30" height="30" transform="translate(50, -15)">
                    <button style="width: 100%; height: 100%;">E</button>
                </foreignObject>
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