let canvas;
let gl;
let controlPanel;

window.onload = init;

let objs = new ObjectsContainer();

objs.addObject(new Cube(shuffle(WebGL_MULTICOLOUR)), 'Cube 1');
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

    Shader.init('vertex-shader', 'fragment-shader');

    objs.init();
    Camera.init();

    render();
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    Camera.resolve();

    objs.drawObjects();

    requestAnimFrame(render);
}