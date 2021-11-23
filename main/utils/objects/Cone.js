class Cone extends Entity {
    constructor(color) {
        super([], [], [], []);

        this.color = color;
        this.bot = vec3(0.0, -0.5, 0.0);
        this.top = vec3(0.0, 0.5, 0.0);
        this.radius = 0.5;
    }

    create() {
        for (let i = 0; i < 349; i += 12) {  // 1073
            let a = vec3(this.radius * Math.cos(i / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin(i / 180 * Math.PI) + this.bot[2]);
            let b = vec3(this.radius * Math.cos((i + 12) / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin((i + 12) / 180 * Math.PI) + this.bot[2]);
            let c = this.bot;
            let normal = this.calculateNormal(a, b, c);

            this.normals.push(normal);
            this.normals.push(normal);
            this.normals.push(normal);

            this.vertices.push(a);
            this.vertices.push(b);
            this.vertices.push(c);

            this.textureCoords.push(vec2(1.0, 1.0), vec2(1.0, 0.0), vec2(0.0, 1.0));

            this.colors.push(...this.color[0]);
        }

        for (let i = 0; i < 349; i += 12) {
            let a = vec3(this.radius * Math.cos(i / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin(i / 180 * Math.PI) + this.bot[2]);
            let b = vec3(this.radius * Math.cos((i + 12) / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin((i + 12) / 180 * Math.PI) + this.bot[2]);
            let c = this.top;
            let normal = this.calculateNormal(a, b, c);

            this.normals.push(normal);
            this.normals.push(normal);
            this.normals.push(normal);

            this.vertices.push(a);
            this.vertices.push(b);
            this.vertices.push(c);

            this.textureCoords.push(vec2(1.0, 1.0), vec2(1.0, 0.0), vec2(0.0, 1.0));

            this.colors.push(...this.color[1]);
        }
    }

    init() {
        this.create();
        super.init();
    }
}