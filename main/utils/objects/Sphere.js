class Sphere extends Entity {
    constructor(color) {
        super([], [], []);

        this.color = color;
    }

    createTriangle(a, b, c) {
        let normal = this.calculateNormal(a, b, c);

        this.vertices.push(a);
        this.vertices.push(b);
        this.vertices.push(c);

        this.normals.push(normal);
        this.normals.push(normal);
        this.normals.push(normal);

        this.colors.push(...this.color)
    }

    divideTriangles(a, b, c, count) {
        if (count > 0) {
            let ab = mix(a, b, 0.5);
            let ac = mix(a, c, 0.5);
            let bc = mix(b, c, 0.5);

            ab = normalize(ab, false);
            ac = normalize(ac, false);
            bc = normalize(bc, false);

            this.divideTriangles(a, ab, ac, count - 1);
            this.divideTriangles(ab, b, bc, count - 1);
            this.divideTriangles(bc, c, ac, count - 1);
            this.divideTriangles(ab, bc, ac, count - 1);
        } else {
            this.createTriangle(a, b, c);
        }
    }

    create(n = 3) {
        let a = vec3(0.0, 0.0, -1.0);
        let b = vec3(0.0, 0.94, 0.33);
        let c = vec3(-0.81, -0.47, 0.33);
        let d = vec3(0.87, -0.4, 0.33);

        this.divideTriangles(a, b, c, n);
        this.divideTriangles(d, c, b, n);
        this.divideTriangles(a, d, b, n);
        this.divideTriangles(a, c, d, n);
    }

    init() {
        this.create();
        super.init();
    }
}