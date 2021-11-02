class Cone extends Entity {
    constructor(color) {
        super([], [], []);

        this.color = color;
        this.bot = vec3(0.0, -0.5, 0.0);
        this.top = vec3(0.0, 0.5, 0.0);
        this.radius = 0.5;
    }

    create() {
        for (let i = 0; i < 349; i += 12) {  // 1073
            this.vertices.push(vec3(this.radius * Math.cos(i / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin(i / 180 * Math.PI) + this.bot[2]));
            this.vertices.push(vec3(this.radius * Math.cos((i + 12) / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin((i + 12) / 180 * Math.PI) + this.bot[2]));
            this.vertices.push(this.bot);
            this.colors.push(...this.color[0]);
        }

        for (let i = 0; i < 349; i += 12) {
            this.vertices.push(vec3(this.radius * Math.cos(i / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin(i / 180 * Math.PI) + this.bot[2]));
            this.vertices.push(vec3(this.radius * Math.cos((i + 12) / 180 * Math.PI) + this.bot[0], this.bot[1], this.radius * Math.sin((i + 12) / 180 * Math.PI) + this.bot[2]));
            this.vertices.push(this.top);
            this.colors.push(...this.color[1]);
        }
    }

    init() {
        this.create();
        super.init();
    }
}