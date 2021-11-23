class ObjectsContainer {
    constructor() {
        this.container = [];
        this.names = [];
        this.id = -1;
    }

    init() {
        this.initObjects();
        this.addOption();
        this.initButtons();
        this.optionChangeHandler();
        this.initObjectLoader();
    }

    addObject(obj, name) {
        this.container.push(obj);
        this.names.push(name);
    }

    initObjects() {
        this.container.forEach(element => element.init());
    }

    drawObjects(lights, texture) {
        this.container.forEach(element => element.draw(lights));
    }

    removeObject() {
        const options = document.getElementById("select-object");
        const id = options.selectedIndex;

        if (id != 0) {

            options.options[id].remove();
            this.container.splice(id - 1, 1);
            this.names.splice(id - 1, 1);
            this.id = -1;

            document.getElementById("translateXSlider").value = 0;
            document.getElementById("translateYSlider").value = 0;
            document.getElementById("translateZSlider").value = 0;
            document.getElementById("scaleSlider").value = 1;
            document.getElementById("rotateXSlider").value = 0;
            document.getElementById("rotateYSlider").value = 0;
            document.getElementById("rotateZSlider").value = 0;

            document.getElementById("object-slider-value1").innerHTML = 0;
            document.getElementById("object-slider-value2").innerHTML = 0;
            document.getElementById("object-slider-value3").innerHTML = 0;
            document.getElementById("object-slider-value4").innerHTML = 1;
            document.getElementById("object-slider-value5").innerHTML = 0;
            document.getElementById("object-slider-value6").innerHTML = 0;
            document.getElementById("object-slider-value7").innerHTML = 0;
        }
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
                case 'Sphere':
                    regex = new RegExp("Sphere \\d");
                    name = "";

                    for (let i = this.names.length - 1; i >= 0; i--) {
                        if (regex.test(this.names[i])) {
                            name = "Sphere " + (this.names[i].slice(this.names[i].length - 2) - 0 + 1);
                            break;
                        }
                    }

                    if (name === "") {
                        name = "Sphere 1";
                    }

                    objs.addObject(new Sphere(pickOneRandomColor(WebGL_RED, WebGL_BLUE, WebGL_AQUA)), name);
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
        const translateXSlider = document.getElementById("translateXSlider");
        const translateYSlider = document.getElementById("translateYSlider");
        const translateZSlider = document.getElementById("translateZSlider");
        const scaleSlider = document.getElementById("scaleSlider");
        const rotateXSlider = document.getElementById("rotateXSlider");
        const rotateYSlider = document.getElementById("rotateYSlider");
        const rotateZSlider = document.getElementById("rotateZSlider");
        const texture = document.getElementById("select-texture");

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

        options.addEventListener("change", () => {
            this.id = options.selectedIndex - 1;

            translateXSlider.value = (this.id === -1) ? 0 : this.container[this.id].translation[0];
            translateYSlider.value = (this.id === -1) ? 0 : this.container[this.id].translation[1];
            translateZSlider.value = (this.id === -1) ? 0 : this.container[this.id].translation[2];
            scaleSlider.value = (this.id === -1) ? 1 : this.container[this.id].scale[0];
            rotateXSlider.value = (this.id === -1) ? 0 : this.container[this.id].theta[0];
            rotateYSlider.value = (this.id === -1) ? 0 : this.container[this.id].theta[1];
            rotateZSlider.value = (this.id === -1) ? 0 : this.container[this.id].theta[2];
            texture.selectedIndex = (this.id === -1) ? 0 : this.container[this.id].textureData;

            document.getElementById("object-slider-value1").innerHTML = (this.id === -1) ? 0 : this.container[this.id].translation[0];
            document.getElementById("object-slider-value2").innerHTML = (this.id === -1) ? 0 : this.container[this.id].translation[1];
            document.getElementById("object-slider-value3").innerHTML = (this.id === -1) ? 0 : this.container[this.id].translation[2];
            document.getElementById("object-slider-value4").innerHTML = (this.id === -1) ? 1 : this.container[this.id].scale[0];
            document.getElementById("object-slider-value5").innerHTML = (this.id === -1) ? 0 : this.container[this.id].theta[0];
            document.getElementById("object-slider-value6").innerHTML = (this.id === -1) ? 0 : this.container[this.id].theta[1];
            document.getElementById("object-slider-value7").innerHTML = (this.id === -1) ? 0 : this.container[this.id].theta[2];
        });
    }

    initObjectLoader() {
        const objectLoad = document.getElementById("object-load");

        objectLoad.addEventListener('change', () => {
            let file = objectLoad.files[0];

            let reader = new FileReader();

            reader.onload = () => {
                let lines = reader.result.split('\n');
                let vertices = [];
                let textureCoords = [];
                let normals = [];
                let lineVertices = [];
                let lineTextureCoords = [];
                let lineNormals = [];
                let lineFaces = [];

                for (let line of lines) {
                    let res = line.replace("\r", "").split(" ");

                    if (res[0] === 'v') {
                        if (res[1] === '') {
                            lineVertices.push(vec3(res[2], res[3], res[4]));
                        } else {
                            lineVertices.push(vec3(res[1], res[2], res[3]));
                        }
                    } else if (res[0] === 'vn') {
                        lineNormals.push(vec4(res[1], res[2], res[3], 1.0));
                    } else if (res[0] === 'vt') {
                        lineTextureCoords.push(vec2(res[1], 1.0 - res[2]));
                    } else if (res[0] === 'f') {
                        lineFaces.push([res[1], res[2], res[3]]);
                    }
                }


                for (let face of lineFaces) {
                    for (let part of face) {
                        const [vertex, textureCoord, normal] = part.split("/");

                        vertices.push(lineVertices[vertex - 1]);
                        lineNormals[normal - 1] && normals.push(lineNormals[normal - 1]);
                        textureCoords.push(lineTextureCoords[textureCoord - 1]);
                    }
                }

                const regex = new RegExp("Object \\d");
                let name = "";

                for (let i = this.names.length - 1; i >= 0; i--) {
                    if (regex.test(this.names[i])) {
                        name = "Object " + (this.names[i].slice(this.names[i].length - 2) - 0 + 1);
                        break;
                    }
                }

                if (name === "") {
                    name = "Object 1";
                }

                objectLoad.value = "";

                console.log(vertices)
                console.log(normals)
                console.log(textureCoords)

                objs.addObject(new Entity(vertices, [], normals, textureCoords), name);
                this.container[this.container.length - 1].init();
                this.addOption();
            };

            reader.readAsText(file);
        });
    }

    translateXHandler = (event) => {
        if (this.id != -1) {
            this.container[this.id].translation[0] = event.target.value;
            document.getElementById("object-slider-value1").innerHTML = event.target.value;
        }
    }

    translateYHandler = (event) => {
        if (this.id != -1) {
            this.container[this.id].translation[1] = event.target.value;
            document.getElementById("object-slider-value2").innerHTML = event.target.value;
        }
    }

    translateZHandler = (event) => {
        if (this.id != -1) {
            this.container[this.id].translation[2] = event.target.value;
            document.getElementById("object-slider-value3").innerHTML = event.target.value;
        }
    }

    scaleHandler = (event) => {
        if (this.id != -1) {
            this.container[this.id].scale[0] = event.target.value;
            this.container[this.id].scale[1] = event.target.value;
            this.container[this.id].scale[2] = event.target.value;
            document.getElementById("object-slider-value4").innerHTML = event.target.value;
        }
    }

    rotateXHandler = (event) => {
        if (this.id != -1) {
            this.container[this.id].theta[0] = event.target.value;
            document.getElementById("object-slider-value5").innerHTML = event.target.value;
        }
    }

    rotateYHandler = (event) => {
        if (this.id != -1) {
            this.container[this.id].theta[1] = event.target.value;
            document.getElementById("object-slider-value6").innerHTML = event.target.value;
        }
    }

    rotateZHandler = (event) => {
        if (this.id != -1) {
            this.container[this.id].theta[2] = event.target.value;
            document.getElementById("object-slider-value7").innerHTML = event.target.value;
        }
    }
}