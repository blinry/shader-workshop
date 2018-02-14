uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

// polynomial smooth min
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
}

float map(vec2 coord) {
    vec2 mouse = u_mouse/u_resolution;

    return 1.0;
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution;

    vec3 colorA = vec3(0.8, 0.2, 0.2);
    vec3 colorB = vec3(0.2, 0.8, 0.2);
    vec3 colorC = vec3(0.2, 0.8, 0.8);
    vec3 colorD = vec3(1.0, 1.0, 1.0);

    vec3 color = colorA*map(coord);

    gl_FragColor = vec4(color, 1.0);
}
