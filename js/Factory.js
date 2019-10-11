class Factory {
    constructor (that) {
        this.that = that;
    }

    createElement (x, y) {
        let element = new Element(x, y, this.that.elements.length);
        this.that.elements.push(element);

        return element;
    }

    createLine (el1, el2, elSection1, elSection2) {
        let line = new Line(el1, el2, elSection1, elSection2, this.that.lines.length);
        this.that.lines.push(line);

        return line;
    }

    generateElement () {

    }


}