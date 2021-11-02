class Pyramid extends Entity {
    constructor(color) {
        super([], []);

        this.color = color;
        [this.top, ...this.points] = WebGL_PYRAMID;
    }

    createSquareFromTriangles(a, b, c, d) {
        this.vertices.push(this.points[a]);
        this.vertices.push(this.points[b]);
        this.vertices.push(this.points[c]);
        this.vertices.push(this.points[d]);
        this.vertices.push(this.points[b]);
        this.vertices.push(this.points[c]);
    }

    create() {
        this.createSquareFromTriangles(0, 1, 2, 3);

        this.vertices.push(this.points[0]);
        this.vertices.push(this.points[1]);
        this.vertices.push(this.top);

        this.vertices.push(this.points[0]);
        this.vertices.push(this.points[2]);
        this.vertices.push(this.top);

        this.vertices.push(this.points[2]);
        this.vertices.push(this.points[3]);
        this.vertices.push(this.top);

        this.vertices.push(this.points[1]);
        this.vertices.push(this.points[3]);
        this.vertices.push(this.top);


        this.colors = [
            ...this.color[0],
            ...this.color[0],
            ...this.color[1],
            ...this.color[2],
            ...this.color[3],
            ...this.color[4]
        ]
    }

    init() {
        this.create();
        super.init();
    }
}