class Camera {
    static near = '0.11';
    static far = 3.0;
    static radius = 4.0;
    static theta = 0.0;
    static phi = 0.0;
    static dr = 5.0 * Math.PI / 180.0;

    static fovy = 30.0;
    static aspect = 1.0;

    static eye = 0;
    static at = vec3(0.0, 0.0, 0.0);
    static up = vec3(0.0, 1.0, 0.0);

    static modelViewMatrix = null;
    static projectionMatrix = null;

    static init = () => {
        document.getElementById("nearSlider").onchange = (event) => {
            this.near = event.target.value;
            document.getElementById("camera-slider-value1").innerHTML = event.target.value;
        }
        document.getElementById("nearSlider").onmousemove = (event) => {
            this.near = event.target.value;
            document.getElementById("camera-slider-value1").innerHTML = event.target.value;
        }
        document.getElementById("farSlider").onchange = (event) => {
            this.far = event.target.value;
            document.getElementById("camera-slider-value2").innerHTML = event.target.value;
        }
        document.getElementById("farSlider").onmousemove = (event) => {
            this.far = event.target.value;
            document.getElementById("camera-slider-value2").innerHTML = event.target.value;
        }
        document.getElementById("radiusSlider").onchange = (event) => {
            this.radius = event.target.value;
            document.getElementById("camera-slider-value3").innerHTML = event.target.value;
        }
        document.getElementById("radiusSlider").onmousemove = (event) => {
            this.radius = event.target.value;
            document.getElementById("camera-slider-value3").innerHTML = event.target.value;
        }
        document.getElementById("thetaSlider").onchange = (event) => {
            this.theta = event.target.value * Math.PI / 180.0;
            document.getElementById("camera-slider-value4").innerHTML = event.target.value;
        }
        document.getElementById("thetaSlider").onmousemove = (event) => {
            this.theta = event.target.value * Math.PI / 180.0;
            document.getElementById("camera-slider-value4").innerHTML = event.target.value;
        }
        document.getElementById("phiSlider").onchange = (event) => {
            this.phi = event.target.value * Math.PI / 180.0;
            document.getElementById("camera-slider-value5").innerHTML = event.target.value;
        }
        document.getElementById("phiSlider").onmousemove = (event) => {
            this.phi = event.target.value * Math.PI / 180.0;
            document.getElementById("camera-slider-value5").innerHTML = event.target.value;
        }
        document.getElementById("fovSlider").onchange = (event) => {
            this.fovy = event.target.value;
            document.getElementById("camera-slider-value6").innerHTML = event.target.value;
        }
        document.getElementById("fovSlider").onmousemove = (event) => {
            this.fovy = event.target.value;
            document.getElementById("camera-slider-value6").innerHTML = event.target.value;
        }
        document.getElementById("aspectSlider").onchange = (event) => {
            this.aspect = event.target.value;
            document.getElementById("camera-slider-value7").innerHTML = event.target.value;
        }
        document.getElementById("aspectSlider").onmousemove = (event) => {
            this.aspect = event.target.value;
            document.getElementById("camera-slider-value7").innerHTML = event.target.value;
        }
    }

    static resolve() {
        this.eye = vec3(this.radius * Math.sin(this.theta) * Math.cos(this.phi),
            this.radius * Math.sin(this.theta) * Math.sin(this.phi), this.radius * Math.cos(this.theta));
        this.modelViewMatrix = lookAt(this.eye, this.at, this.up);
        this.projectionMatrix = perspective(this.fovy, this.aspect, this.near, this.far);
    }
}