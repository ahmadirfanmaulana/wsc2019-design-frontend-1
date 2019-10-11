class Listen  {
    constructor (that) {
        this.that = that;
        this.code = {
            shift: false
        };
        this.selectedElement = false;
    }

    keydown (e) {

    }

    keyup (e) {

    }

    mousedown (e) {
        let target = $(e.target), element = null;
        if (target.hasClass('draggable')) {
            element = target.parent('.element').data('id');
            this.selectedElement = element.toString();
        }
    }

    mousemove (e) {
        if (this.selectedElement) {
            let pos = this.getMousePosition(e);

            if (pos.x >= sw - 40) {
                pos.x = sw - 40;
            } else if (pos.x <= 40) {
                pos.x = 40;
            }

            if (pos.y >= sh - 40) {
                pos.y = sh - 40;
            } else if (pos.y <= 40) {
                pos.y = 40;
            }

            this.that.elements[this.selectedElement].x = pos.x;
            this.that.elements[this.selectedElement].y = pos.y
        }
    }

    mouseup (e) {
        this.selectedElement = false;
    }

    mouseleave (e) {
        this.selectedElement = false;
    }

    getMousePosition (e) {
        let rect = this.that.svg.offset();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        return { x, y };
    }

}