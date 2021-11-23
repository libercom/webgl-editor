class Cube extends Entity {
    constructor(color) {
        super([], [], [], []);

        this.color = color;
        this.points = [...WebGL_CUBE];
    }

    createSquareFromTriangles(a, b, c, d, face) {
        // vertex coordinates calculation

        this.vertices.push(this.points[a]);
        this.vertices.push(this.points[b]);
        this.vertices.push(this.points[c]);
        this.vertices.push(this.points[d]);
        this.vertices.push(this.points[b]);
        this.vertices.push(this.points[c]);

        // normal of the faces calculation

        let normal = null;

        if (face === 0 || face === 1 || face === 4) {
            normal = this.calculateNormal(this.points[a], this.points[b], this.points[c]);
        } else {
            normal = this.calculateNormal(this.points[d], this.points[b], this.points[c]);
        }

        this.normals.push(normal);
        this.normals.push(normal);
        this.normals.push(normal);

        this.normals.push(normal);
        this.normals.push(normal);
        this.normals.push(normal);

        // texture coordinates calculation

        this.textureCoords.push(vec2(1.0, 1.0), vec2(1.0, 0.0), vec2(0.0, 1.0));
        this.textureCoords.push(vec2(0.0, 0.0), vec2(1.0, 0.0), vec2(0.0, 1.0));
    }

    create() {
        this.createSquareFromTriangles(0, 1, 2, 3, 0); // front face
        this.createSquareFromTriangles(1, 5, 3, 7, 1); // top face
        this.createSquareFromTriangles(0, 1, 4, 5, 2); // left face
        this.createSquareFromTriangles(4, 5, 6, 7, 3); // back face
        this.createSquareFromTriangles(2, 3, 6, 7, 4); // right face
        this.createSquareFromTriangles(0, 4, 2, 6, 5); // bottom face
        this.colors = [
            ...this.color[0],
            ...this.color[0],
            ...this.color[1],
            ...this.color[1],
            ...this.color[2],
            ...this.color[2],
            ...this.color[3],
            ...this.color[3],
            ...this.color[4],
            ...this.color[4],
            ...this.color[5],
            ...this.color[5],
        ]
    }

    init() {
        this.create();
        super.init();
    }
}