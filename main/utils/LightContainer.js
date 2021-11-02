class LightContainer {
    constructor() {
        this.container = [];
        this.id = -1;
        this.names = [];
    }

    init() {
        this.initButtons();
        this.addOption();
        this.optionChangeHandler();
    }

    addLightSource(name) {
        this.container.push(vec4(0.0, 0.0, 0.0, 1.0));
        this.names.push(name);
    }

    initButtons() {
        document.getElementById("add-light").addEventListener("click", () => {
            let name = "Light Source " + (this.names[this.names.length - 1].slice(this.names[this.names.length - 1].length - 2) - 0 + 1);

            this.addLightSource(name);
            this.addOption();
        })
    }

    addOption() {
        const options = document.getElementById("select-light");
        const element = this.names[this.names.length - 1];
        const option = document.createElement("option");
        option.innerHTML = element;
        option.value = element.slice(0, element.length - 2);
        options.appendChild(option);
    }

    optionChangeHandler() {
        const options = document.getElementById("select-light");
        const lTranslateXSlider = document.getElementById("lTranslateXSlider");
        const lTranslateYSlider = document.getElementById("lTranslateYSlider");
        const lTranslateZSlider = document.getElementById("lTranslateZSlider");

        lTranslateXSlider.addEventListener("change", this.lTranslateXHandler);
        lTranslateXSlider.addEventListener("mousemove", this.lTranslateXHandler);
        lTranslateYSlider.addEventListener("change", this.lTranslateYHandler);
        lTranslateYSlider.addEventListener("mousemove", this.lTranslateYHandler);
        lTranslateZSlider.addEventListener("change", this.lTranslateZHandler);
        lTranslateZSlider.addEventListener("mousemove", this.lTranslateZHandler);

        options.addEventListener("change", () => {
            this.id = options.selectedIndex - 1;

            lTranslateXSlider.value = (this.id === -1) ? 0 : this.container[this.id][0];
            lTranslateYSlider.value = (this.id === -1) ? 0 : this.container[this.id][1];
            lTranslateZSlider.value = (this.id === -1) ? 0 : this.container[this.id][2];

            document.getElementById("light-slider-value1").innerHTML = (this.id === -1) ? 0 : this.container[this.id][0];
            document.getElementById("light-slider-value2").innerHTML = (this.id === -1) ? 0 : this.container[this.id][1];
            document.getElementById("light-slider-value3").innerHTML = (this.id === -1) ? 0 : this.container[this.id][2];
        });
    }

    lTranslateXHandler = event => {
        if (this.id != -1) {
            this.container[this.id][0] = event.target.value;
            document.getElementById("light-slider-value1").innerHTML = event.target.value;
        }
    }

    lTranslateYHandler = event => {
        if (this.id != -1) {
            this.container[this.id][1] = event.target.value;
            document.getElementById("light-slider-value2").innerHTML = event.target.value;
        }
    }

    lTranslateZHandler = event => {
        if (this.id != -1) {
            this.container[this.id][2] = event.target.value;
            document.getElementById("light-slider-value3").innerHTML = event.target.value;
        }
    }
}