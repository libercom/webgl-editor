class Cube extends Entity {
    constructor(color) {
        super([], [], []);

        this.color = color;
        this.points = [...WebGL_CUBE];
    }

    createSquareFromTriangles(a, b, c, d) {
        this.vertices.push(this.points[a]);
        this.vertices.push(this.points[b]);
        this.vertices.push(this.points[c]);
        this.vertices.push(this.points[d]);
        this.vertices.push(this.points[b]);
        this.vertices.push(this.points[c]);

        let normal = this.calculateNormal(this.points[a], this.points[b], this.points[c]);
        this.normals.push(normal);
        this.normals.push(normal);
        this.normals.push(normal);

        normal = this.calculateNormal(this.points[d], this.points[b], this.points[c]);
        this.normals.push(normal);
        this.normals.push(normal);
        this.normals.push(normal);
    }

    create() {
        this.createSquareFromTriangles(0, 1, 2, 3);
        this.createSquareFromTriangles(1, 5, 3, 7);
        this.createSquareFromTriangles(0, 1, 4, 5);
        this.createSquareFromTriangles(4, 5, 6, 7);
        this.createSquareFromTriangles(2, 3, 6, 7);
        this.createSquareFromTriangles(0, 4, 2, 6);
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