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

        el1.relations.push(el2.id+'|'+elSection2);
        el2.relations.push(el1.id+'|'+elSection1);

        let line = new Line(el1, el2, elSection1, elSection2, this.that.lines.length);
        this.that.lines.push(line);

        this.updateView();

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

    updateView (elIndex=0) {
        let active = this.that.elements[elIndex];

        if (active.content == '') {
            active.content = 'Slide default ' + (active.id + 1);
        }

        this.that.view.find('.preview').html(active.content);
        this.that.view.find('.button-wrap').html('');

        let relations = active.relations;
        relations.forEach((relation) => {

            let el = relation.split('|')[0];
            let section = relation.split('|')[1];
            
            if (this.that.elements[el].active) {
                let btn = document.createElement('button');
                btn.setAttribute('data-target-el', el);
                btn.setAttribute('data-target-section', section);
                btn.addEventListener('click', (e) => {
                    this.updateView(el);
                });
                btn.innerHTML = section + ' - ' + ' default ' + section;
                this.that.view.find('.button-wrap').append(btn);
            }
        });
    }


}