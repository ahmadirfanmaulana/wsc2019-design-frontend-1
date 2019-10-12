class Listen  {
    constructor (that) {
        this.that = that;
        this.code = {
            shift: false
        };
        this.selectedElement = false;
        this.clicked = false;
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

    click (e) {
        let target = $(e.target);

        if (!this.selectedElement) {

            // generate new element
            if (target.hasClass('section')) {
                let el = this.that.elements[target.parent('.element').data('id')];
                let elPart = target.data('nth');

                if (!target.hasClass('have-relation')) {
                    this.that.factory.generateElement(el, elPart);
                }
            }
            
            // edit action
            if (target.hasClass('button-element') && target.data('action') == 'edit') {
                this.that.elements[target.parent('.button').parent('.element').data('id')].showModal();
            }

            // delete action
            if (target.hasClass('button-element') && target.data('action') == 'delete') {

                this.that.elements[target.parent('.button').parent('.element').data('id')].delete(this.that);

            }



        }
    }

    getMousePosition (e) {
        let rect = this.that.svg.offset();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        return { x, y };
    }

}