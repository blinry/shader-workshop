uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

float circle(vec2 coord, vec2 center, float r) {
    return 1.0-smoothstep(r-0.02, r+0.02, distance(coord, center));
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;

    vec3 colorA = vec3(0.8, 0.2, 0.2);
    vec3 colorB = vec3(0.2, 0.8, 0.2);
    vec3 colorC = vec3(0.2, 0.8, 0.8);

    vec3 color = colorA*circle(coord, vec2(0.5, 0.5), 0.1);
    color += colorB*circle(coord, mouse, 0.2);

    gl_FragColor = vec4(color, 1.0);
}
