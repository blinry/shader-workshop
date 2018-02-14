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

    float circ1 = distance(vec2(0.8+sin(u_time)*0.1,0.8), coord)-0.1;
    float circ2 = distance(vec2(0.3,0.7), coord)-0.2;
    float rect = length(max(abs(coord-mouse) - vec2(0.2,0.1),0.0));
    return smin(smin(rect, circ1, 0.1), circ2, 0.1);
}

void main() {
    vec2 coord = gl_FragCoord.xy/u_resolution;

    vec3 colorA = vec3(0.8, 0.2, 0.2);
    vec3 colorB = vec3(0.2, 0.8, 0.2);
    vec3 colorC = vec3(0.2, 0.8, 0.8);
    vec3 colorD = vec3(1.0, 1.0, 1.0);

    vec3 color = colorA*step(0.0, -map(coord)) + colorC*fract(max(0.0, map(coord))*10.0);

    gl_FragColor = vec4(color, 1.0);
}
