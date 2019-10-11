class Line {
    constructor (el1, el2, elSection1, elSection2, id) {
        this.add1 = {
            x: 0,
            y: 0
        };

        this.add2 = {
            x: 0,
            y: 0
        };

        this.id = id;
        this.el1 = el1;
        this.el2 = el2;
        this.elSection1 = elSection1;
        this.elSection2 = elSection2;

        if (this.elSection1 == 1) {
            this.add1.y -= 40;
        } else if (this.elSection1 == 2) {
            this.add1.x += 40;
        } else if (this.elSection1 == 3) {
            this.add1.y += 40;
        } else if (this.elSection1 == 4) {
            this.add1.x -= 40;
        }

        if (this.elSection2 == 1) {
            this.add2.y -= 40;
        } else if (this.elSection2 == 2) {
            this.add2.x += 40;
        } else if (this.elSection2 == 3) {
            this.add2.y += 40;
        } else if (this.elSection2 == 4) {
            this.add2.x -= 40;
        }


        this.object = $(`
            <line id="line-${this.id}" data-id="${this.id}" class="line" x1="${this.el1.x + this.add1.x}" y1="${this.el1.y + this.add1.y}" x2="${this.el2.x + this.add2.x}" y2="${this.el2.y + this.add2.y}"></line>
        `);
        this.selector = `#line-${this.id}`;

        svg.append(this.object).html(svg.html());
        this.update();
    }

    update () {
        $(this.selector)[0].setAttributeNS(null, `x1`, this.el1.x + this.add1.x);
        $(this.selector)[0].setAttributeNS(null, `y1`, this.el1.y + this.add1.y);
        $(this.selector)[0].setAttributeNS(null, `x2`, this.el2.x + this.add2.x);
        $(this.selector)[0].setAttributeNS(null, `y2`, this.el2.y + this.add2.y);
    }
}