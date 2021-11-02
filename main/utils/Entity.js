class Entity {
    constructor(vertices, colors) {
        this.vertices = vertices;
        this.colors = colors;

        this.vertexBuffer = null;
        this.colorBuffer = null;

        this.vertexAttributeLocation = null;
        this.colorAttributeLocation = null;
        this.thetaLoc = null;
        this.scaleLoc = null;
        this.translationLoc = null;

        this.theta = vec3(0.0, 0.0, 0.0);
        this.scale = vec3(1.0, 1.0, 1.0);
        this.translation = vec3(0.0, 0.0, 0.0);
    }

    init() {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

        this.colorBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW);

        this.vertexAttributeLocation = Shader.getAttribLocation('vPosition');
        this.colorAttributeLocation = Shader.getAttribLocation('vColor');
    }

    select() {
        Shader.use();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

        gl.vertexAttribPointer(this.vertexAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.vertexAttributeLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

        gl.vertexAttribPointer(this.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.colorAttributeLocation);

        this.thetaLoc = Shader.getUniformLocation("theta");
        this.scaleLoc = Shader.getUniformLocation("sm");;
        this.translationLoc = Shader.getUniformLocation("tm");;
        this.modelViewMatrixLoc = Shader.getUniformLocation("modelViewMatrix");
        this.projectionMatrixLoc = Shader.getUniformLocation("projectionMatrix");
    }

    draw() {
        this.select();

        gl.uniform3fv(this.thetaLoc, this.theta);
        gl.uniform3fv(this.scaleLoc, this.scale);
        gl.uniform3fv(this.translationLoc, this.translation);
        gl.uniformMatrix4fv(this.modelViewMatrixLoc, false, flatten(Camera.modelViewMatrix));
        gl.uniformMatrix4fv(this.projectionMatrixLoc, false, flatten(Camera.projectionMatrix));

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
    }
}