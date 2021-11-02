class Shader {
    static program = null;

    static init(vertexShader, fragemntShader) {
        this.program = initShaders(gl, vertexShader, fragemntShader);
    }

    static use() {
        gl.useProgram(this.program);
    }

    static getAttribLocation(attribute) {
        return gl.getAttribLocation(this.program, attribute);
    }

    static getUniformLocation(uniform) {
        return gl.getUniformLocation(this.program, uniform);
    }
}