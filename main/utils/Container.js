function createUniqueName(name) {
    let regex = new RegExp(name + " \\d");
    let result = "";

    for (let i = this.names.length - 1; i >= 0; i--) {
        if (regex.test(this.names[i])) {
            result = name + " " + (this.names[i].slice(this.names[i].length - 2) - 0 + 1);
            console.log(result);
        }
    }

    if (result === "") {
        result = name + " 1";
    }

    return result;
}

class ObjectsContainer {
    constructor() {
        this.container = [];
        this.names = [];
        this.id = 0;
    }

    init() {
        this.initObjects();
        this.addOption();
        this.initButtons();
        this.optionChangeHandler();
    }

    addObject(obj, name) {
        this.container.push(obj);
        this.names.push(name);
    }

    initObjects() {
        this.container.forEach(element => element.init());
    }

    drawObjects() {
        this.container.forEach(element => element.draw());
    }

    removeObject() {
        const options = document.getElementById("select-object");
        const id = options.selectedIndex;
        options.options[id].remove();
        this.container.splice(id - 1, 1);
        this.names.splice(id - 1, 1);

        const translateXSlider = document.getElementById("translateXSlider");
        const translateYSlider = document.getElementById("translateYSlider");
        const translateZSlider = document.getElementById("translateZSlider");
        const scaleSlider = document.getElementById("scaleSlider");
        const rotateXSlider = document.getElementById("rotateXSlider");
        const rotateYSlider = document.getElementById("rotateYSlider");
        const rotateZSlider = document.getElementById("rotateZSlider");

        translateXSlider.value = 0;
        translateYSlider.value = 0;
        translateZSlider.value = 0;
        scaleSlider.value = 1;
        rotateXSlider.value = 0;
        rotateYSlider.value = 0;
        rotateZSlider.value = 0;

        translateXSlider.removeEventListener("change", this.translateXHandler);
        translateXSlider.removeEventListener("mousemove", this.translateXHandler);
        translateYSlider.removeEventListener("change", this.translateYHandler);
        translateYSlider.removeEventListener("mousemove", this.translateYHandler);
        translateZSlider.removeEventListener("change", this.translateZHandler);
        translateZSlider.removeEventListener("mousemove", this.translateZHandler);
        scaleSlider.removeEventListener("change", this.scaleHandler);
        scaleSlider.removeEventListener("mousemove", this.scaleHandler);
        rotateXSlider.removeEventListener("change", this.rotateXHandler);
        rotateXSlider.removeEventListener("mousemove", this.rotateXHandler);
        rotateYSlider.removeEventListener("change", this.rotateYHandler);
        rotateYSlider.removeEventListener("mousemove", this.rotateYHandler);
        rotateZSlider.removeEventListener("change", this.rotateZHandler);
        rotateZSlider.removeEventListener("mousemove", this.rotateZHandler);

        document.getElementById("object-slider-value1").innerHTML = 0;
        document.getElementById("object-slider-value2").innerHTML = 0;
        document.getElementById("object-slider-value3").innerHTML = 0;
        document.getElementById("object-slider-value4").innerHTML = 1;
        document.getElementById("object-slider-value5").innerHTML = 0;
        document.getElementById("object-slider-value6").innerHTML = 0;
        document.getElementById("object-slider-value7").innerHTML = 0;
    }

    initButtons() {
        document.getElementById("add-object").addEventListener("click", () => {
            const obj = document.getElementById("add-object-list").value;
            let regex = null;
            let name = "";

            switch (obj) {
                case 'Cube':
                    regex = new RegExp("Cube \\d");
                    name = "";

                    for (let i = this.names.length - 1; i >= 0; i--) {
                        if (regex.test(this.names[i])) {
                            name = "Cube " + (this.names[i].slice(this.names[i].length - 2) - 0 + 1);
                            break;
                        }
                    }

                    if (name === "") {
                        name = "Cube 1";
                    }

                    this.addObject(new Cube(shuffle(WebGL_MULTICOLOUR)), name);
                    this.container[this.container.length - 1].init();
                    this.addOption();
                    break;

                case 'Pyramid':
                    regex = new RegExp("Pyramid \\d");
                    name = "";

                    for (let i = this.names.length - 1; i >= 0; i--) {
                        if (regex.test(this.names[i])) {
                            name = "Pyramid " + (this.names[i].slice(this.names[i].length - 2) - 0 + 1);
                            break;
                        }
                    }

                    if (name === "") {
                        name = "Pyramid 1";
                    }

                    objs.addObject(new Pyramid(shuffle(WebGL_MULTICOLOUR)), name);
                    this.container[this.container.length - 1].init();
                    this.addOption();
                    break;

                case 'Cone':
                    regex = new RegExp("Cone \\d");
                    name = "";

                    for (let i = this.names.length - 1; i >= 0; i--) {
                        if (regex.test(this.names[i])) {
                            name = "Cone " + (this.names[i].slice(this.names[i].length - 2) - 0 + 1);
                            break;
                        }
                    }

                    if (name === "") {
                        name = "Cone 1";
                    }

                    objs.addObject(new Cone(pick2RandomColor(WebGL_MULTICOLOUR)), name);
                    this.container[this.container.length - 1].init();
                    this.addOption();
                    break;
            }
        });

        document.getElementById("remove-object").addEventListener("click", () => {
            this.removeObject();
        })
    }

    addOption() {
        const options = document.getElementById("select-object");
        const element = this.names[this.names.length - 1];
        const option = document.createElement("option");
        option.innerHTML = element;
        option.value = element.slice(0, element.length - 2);
        options.appendChild(option);
    }

    optionChangeHandler() {
        const options = document.getElementById("select-object");
        options.addEventListener("change", () => {
            this.id = options.selectedIndex - 1;

            const translateXSlider = document.getElementById("translateXSlider");
            const translateYSlider = document.getElementById("translateYSlider");
            const translateZSlider = document.getElementById("translateZSlider");
            const scaleSlider = document.getElementById("scaleSlider");
            const rotateXSlider = document.getElementById("rotateXSlider");
            const rotateYSlider = document.getElementById("rotateYSlider");
            const rotateZSlider = document.getElementById("rotateZSlider");

            translateXSlider.value = (this.id === -1) ? 0 : this.container[this.id].translation[0];
            translateYSlider.value = (this.id === -1) ? 0 : this.container[this.id].translation[1];
            translateZSlider.value = (this.id === -1) ? 0 : this.container[this.id].translation[2];
            scaleSlider.value = (this.id === -1) ? 1 : this.container[this.id].scale[0];
            rotateXSlider.value = (this.id === -1) ? 0 : this.container[this.id].theta[0];
            rotateYSlider.value = (this.id === -1) ? 0 : this.container[this.id].theta[1];
            rotateZSlider.value = (this.id === -1) ? 0 : this.container[this.id].theta[2];

            document.getElementById("object-slider-value1").innerHTML = (this.id === -1) ? 0 : this.container[this.id].translation[0];
            document.getElementById("object-slider-value2").innerHTML = (this.id === -1) ? 0 : this.container[this.id].translation[1];
            document.getElementById("object-slider-value3").innerHTML = (this.id === -1) ? 0 : this.container[this.id].translation[2];
            document.getElementById("object-slider-value4").innerHTML = (this.id === -1) ? 1 : this.container[this.id].scale[0];
            document.getElementById("object-slider-value5").innerHTML = (this.id === -1) ? 0 : this.container[this.id].theta[0];
            document.getElementById("object-slider-value6").innerHTML = (this.id === -1) ? 0 : this.container[this.id].theta[1];
            document.getElementById("object-slider-value7").innerHTML = (this.id === -1) ? 0 : this.container[this.id].theta[2];

            translateXSlider.removeEventListener("change", this.translateXHandler);
            translateXSlider.removeEventListener("mousemove", this.translateXHandler);
            translateYSlider.removeEventListener("change", this.translateYHandler);
            translateYSlider.removeEventListener("mousemove", this.translateYHandler);
            translateZSlider.removeEventListener("change", this.translateZHandler);
            translateZSlider.removeEventListener("mousemove", this.translateZHandler);
            scaleSlider.removeEventListener("change", this.scaleHandler);
            scaleSlider.removeEventListener("mousemove", this.scaleHandler);
            rotateXSlider.removeEventListener("change", this.rotateXHandler);
            rotateXSlider.removeEventListener("mousemove", this.rotateXHandler);
            rotateYSlider.removeEventListener("change", this.rotateYHandler);
            rotateYSlider.removeEventListener("mousemove", this.rotateYHandler);
            rotateZSlider.removeEventListener("change", this.rotateZHandler);
            rotateZSlider.removeEventListener("mousemove", this.rotateZHandler);

            if (this.id !== -1) {
                translateXSlider.addEventListener("change", this.translateXHandler);
                translateXSlider.addEventListener("mousemove", this.translateXHandler);
                translateYSlider.addEventListener("change", this.translateYHandler);
                translateYSlider.addEventListener("mousemove", this.translateYHandler);
                translateZSlider.addEventListener("change", this.translateZHandler);
                translateZSlider.addEventListener("mousemove", this.translateZHandler);
                scaleSlider.addEventListener("change", this.scaleHandler);
                scaleSlider.addEventListener("mousemove", this.scaleHandler);
                rotateXSlider.addEventListener("change", this.rotateXHandler);
                rotateXSlider.addEventListener("mousemove", this.rotateXHandler);
                rotateYSlider.addEventListener("change", this.rotateYHandler);
                rotateYSlider.addEventListener("mousemove", this.rotateYHandler);
                rotateZSlider.addEventListener("change", this.rotateZHandler);
                rotateZSlider.addEventListener("mousemove", this.rotateZHandler);
            }
        });
    }

    translateXHandler = (event) => {
        this.container[this.id].translation[0] = event.target.value;
        document.getElementById("object-slider-value1").innerHTML = event.target.value;
    }

    translateYHandler = (event) => {
        this.container[this.id].translation[1] = event.target.value;
        document.getElementById("object-slider-value2").innerHTML = event.target.value;
    }

    translateZHandler = (event) => {
        this.container[this.id].translation[2] = event.target.value;
        document.getElementById("object-slider-value3").innerHTML = event.target.value;
    }

    scaleHandler = (event) => {
        this.container[this.id].scale[0] = event.target.value;
        this.container[this.id].scale[1] = event.target.value;
        this.container[this.id].scale[2] = event.target.value;
        document.getElementById("object-slider-value4").innerHTML = event.target.value;
    }

    rotateXHandler = (event) => {
        this.container[this.id].theta[0] = event.target.value;
        document.getElementById("object-slider-value5").innerHTML = event.target.value;
    }

    rotateYHandler = (event) => {
        this.container[this.id].theta[1] = event.target.value;
        document.getElementById("object-slider-value6").innerHTML = event.target.value;
    }

    rotateZHandler = (event) => {
        this.container[this.id].theta[2] = event.target.value;
        document.getElementById("object-slider-value7").innerHTML = event.target.value;
    }
}