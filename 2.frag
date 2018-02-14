uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution;
    vec2 mouse = u_mouse/u_resolution;

    vec3 color = vec3(0.0, 0.0, 0.0);
    gl_FragColor = vec4(color, 1.0);
}
