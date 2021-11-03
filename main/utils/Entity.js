class Entity {
    constructor(vertices, colors, normals) {
        this.vertices = vertices;
        this.colors = colors;
        this.normals = normals;

        this.vertexBuffer = null;
        this.colorBuffer = null;
        this.normalBuffer = null;

        this.vertexAttributeLocation = null;
        this.colorAttributeLocation = null;
        this.normalAttributeLocation = null;
        this.thetaLoc = null;
        this.scaleLoc = null;
        this.translationLoc = null;

        this.theta = vec3(0.0, 0.0, 0.0);
        this.scale = vec3(1.0, 1.0, 1.0);
        this.translation = vec3(0.0, 0.0, 0.0);

        this.lights = [];
        this.ambientColor = vec4(0.0, 0.0, 0.0, 1.0);
        this.diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);
        this.specularColor = vec4(1.0, 1.0, 1.0, 1.0);
        this.shininess = 1.0;

        this.lightsLoc = null;
        this.numOfLightsLoc = null;
        this.ambientColorLoc = null;
        this.diffuseColorLoc = null;
        this.specularColorLoc = null;
        this.shininessLoc = null;
    }

    init() {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.vertices), gl.STATIC_DRAW);

        // this.colorBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, flatten(this.colors), gl.STATIC_DRAW);

        this.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(this.normals), gl.STATIC_DRAW);

        this.vertexAttributeLocation = Shader.getAttribLocation('vPosition');
        // this.colorAttributeLocation = Shader.getAttribLocation('vColor');
        this.normalAttributeLocation = Shader.getAttribLocation('vNormal');
    }

    select() {
        Shader.use();

        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);

        gl.vertexAttribPointer(this.vertexAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.vertexAttributeLocation);

        // gl.bindBuffer(gl.ARRAY_BUFFER, this.colorBuffer);

        // gl.vertexAttribPointer(this.colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);
        // gl.enableVertexAttribArray(this.colorAttributeLocation);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.normalBuffer);

        gl.vertexAttribPointer(this.normalAttributeLocation, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(this.normalAttributeLocation);

        this.thetaLoc = Shader.getUniformLocation("theta");
        this.scaleLoc = Shader.getUniformLocation("sm");
        this.translationLoc = Shader.getUniformLocation("tm");
        this.modelViewMatrixLoc = Shader.getUniformLocation("modelViewMatrix");
        this.projectionMatrixLoc = Shader.getUniformLocation("projectionMatrix");
        this.lightsLoc = Shader.getUniformLocation("lights");
        this.numOfLightsLoc = Shader.getUniformLocation("numOfLights");
        this.ambientColorLoc = Shader.getUniformLocation("ambientProduct");
        this.diffuseColorLoc = Shader.getUniformLocation("diffuseProduct");
        this.specularColorLoc = Shader.getUniformLocation("specularProduct");
        this.shininessLoc = Shader.getUniformLocation("shininess");
    }

    draw(lights) {
        this.select();

        [this.lights, this.ambientColor, this.specularColor, this.diffuseColor, this.shininess] = lights;
        gl.uniform3fv(this.thetaLoc, this.theta);
        gl.uniform3fv(this.scaleLoc, this.scale);
        gl.uniform3fv(this.translationLoc, this.translation);
        // gl.uniform1iv(this.numOfLightsLoc, this.lights.length);
        gl.uniform4fv(this.lightsLoc, flatten(this.lights));
        gl.uniform4fv(this.ambientColorLoc, this.ambientColor);
        gl.uniform4fv(this.diffuseColorLoc, this.diffuseColor);
        gl.uniform4fv(this.specularColorLoc, this.specularColor);
        gl.uniform1f(this.shininessLoc, this.shininess);
        gl.uniformMatrix4fv(this.modelViewMatrixLoc, false, flatten(Camera.modelViewMatrix));
        gl.uniformMatrix4fv(this.projectionMatrixLoc, false, flatten(Camera.projectionMatrix));

        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
    }

    calculateNormal(a, b, c) {
        let t1 = subtract(b, a);
        let t2 = subtract(c, a);
        let normal = normalize(cross(t2, t1));

        normal = vec4(normal);
        return normal;
    }
}