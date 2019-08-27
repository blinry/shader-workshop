uniform vec2 u_resolution;
uniform float u_time;

#define EPSILON 0.0001

// polynomial smooth min
float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5*(b-a)/k, 0.0, 1.0);
    return mix(b, a, h) - k*h*(1.0-h);
}

float map(vec3 p) {
    p.x = fract(p.x/4.0)*4.0-2.0;
    p.z = fract(p.z/4.0)*4.0-2.0;
    float cube = length(max(abs(p-vec3(0.0, sin(u_time), 0.0)) - vec3(0.5), 0.0))-0.2;
    float plane = p.y + 0.05*sin(-u_time*5.0+length(p.xz)*10.0);
    return smin(plane,cube,0.1);
}

float trace(vec3 origin, vec3 direction) {

    float dist = 0.0;
    for (float i = 0.0; i < 100.0 ; i++) {
        vec3 p = origin + direction*dist;
        float d = map(p);
        if (d <= 0.0) {
            break;
        }
        dist += d;
    }
    return dist;
}

vec3 normal(vec3 p) {
    return normalize(vec3(
        map(vec3(p.x + EPSILON, p.y, p.z)) - map(vec3(p.x - EPSILON, p.y, p.z)),
        map(vec3(p.x, p.y + EPSILON, p.z)) - map(vec3(p.x, p.y - EPSILON, p.z)),
        map(vec3(p.x, p.y, p.z  + EPSILON)) - map(vec3(p.x, p.y, p.z - EPSILON))
    ));
}

void main() {
    vec2 coord = 2.0*gl_FragCoord.xy/u_resolution - vec2(1.0);

    vec3 light = vec3(sin(u_time)*2.0, 2.0, -2.0+cos(u_time)*2.0+u_time*5.0);

    vec3 direction = normalize(vec3(coord, 1.0));
    vec3 origin = vec3(0.0, 1.0, -3.0+u_time*5.0);
    float dist = trace(origin, direction);

    vec3 p = origin + dist*direction;
    vec3 norm = normal(p);
    vec3 reflection = direction - 2.0*dot(direction, norm)*norm;

    float brightness = 1.0-smoothstep(10.0, 20.0, distance(p, light));

    vec3 color = vec3(0.8,1.0,0.8)*max(0.0,dot(norm, normalize(light-p)))*brightness;
    float specular = pow(max(0.0,dot(reflection, normalize(light-p))), 100.0);
    vec3 ambient = vec3(0.2,0.2,0.4);


    color += specular*vec3(1.0)*brightness + ambient;

    gl_FragColor = vec4(color, 1.0);
}
