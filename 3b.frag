uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 coord, vec2 center, float r) {
    return 1.0-smoothstep(r-0.01, r+0.01, distance(coord, center));
}

float rect(vec2 coord, vec2 center, vec2 size) {
    vec2 directions = step(center-size/2.0, coord);
    vec2 directions2 = 1.0-step(center+size/2.0, coord);
    return directions.x*directions.y*directions2.x*directions2.y;
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;

    vec3 colorA = vec3(0.8, 0.2, 0.2);
    vec3 colorB = vec3(0.2, 0.8, 0.2);
    vec3 colorC = vec3(0.2, 0.8, 0.8);

    vec3 color = colorA*rect(coord, mouse, vec2(0.4,0.3)) + colorB*circle(coord, vec2(0.2, 0.2), 0.2);

    gl_FragColor = vec4(color, 1.0);
}
