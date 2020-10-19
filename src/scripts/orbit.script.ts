interface props {
    angle: number,
    speed: number
}
go.property("speed", 1);

export function init(this: props): void {
    this.angle = 0;
}

export function update(this: props, dt: number): void {
    this.angle = this.angle + this.speed * dt;
    go.set_rotation(vmath.quat_rotation_z(this.angle));
}
