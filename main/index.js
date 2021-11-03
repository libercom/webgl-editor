let canvas;
let gl;
let controlPanel;

window.onload = init;

let objs = new ObjectsContainer();
let lights = new LightContainer();

objs.addObject(new Sphere(WebGL_RED), 'Sphere 1');
// objs.addObject(new Cube(shuffle(WebGL_MULTICOLOUR)), 'Cube 2');
// objs.addObject(new Pyramid(shuffle(WebGL_MULTICOLOUR)), 'Pyramid');
// objs.addObject(new Cone(pick2RandomColor(WebGL_MULTICOLOUR)), 'Cone');

function init() {
    canvas = document.getElementById("gl-canvas");
    controlPanel = document.getElementById("control-panel");
    gl = WebGLUtils.setupWebGL(canvas);

    if (!gl) { alert("WebGL isn't available"); }

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    lights.addLightSource("Light Source 1", vec4(4.0, 0.0, 0.0, 1.0));
    lights.addOption();
    lights.addLightSource("Light Source 2", vec4(-4.0, 0.0, 0.0, 1.0));
    lights.addOption();
    lights.addLightSource("Light Source 3", vec4(0.0, 0.0, -4.0, 1.0));

    Shader.init('vertex-shader', 'fragment-shader');
    Camera.init();
    lights.init();
    objs.init();

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    Camera.resolve();

    objs.drawObjects([lights.container, lights.ambientColor, lights.specularColor, lights.diffuseColor, lights.shininess]);

    requestAnimFrame(render);
}