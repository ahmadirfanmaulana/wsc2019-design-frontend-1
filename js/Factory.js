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

    generateElement (elOld, elOldPart) {
        let add = {x: elOld.x, y: elOld.y},
            elNewPart = false;

        if (elOldPart == 1) {
            add.y -= 150;
            elNewPart = 3;
        } else if (elOldPart == 2) {
            add.x += 150;
            elNewPart = 4;
        } else if (elOldPart == 3) {
            add.y += 150;
            elNewPart = 1;
        } else {
            add.x -= 150;
            elNewPart = 2;
        }

        let elNew =  this.createElement(add.x, add.y);

        let lineNew = this.createLine(elOld, elNew, elOldPart, elNewPart);
    }


}