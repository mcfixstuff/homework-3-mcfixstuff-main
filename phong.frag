#version 330 core
out vec4 color;

in vec3 FragPos;   // Fragment position in world space
in vec3 Normal;    // Normal vector in world space

uniform vec3 lightPos;   // Light position in world space
uniform vec3 viewPos;    // Camera/viewer position in world space
uniform vec3 lightColor; // Light color
uniform vec3 objectColor;// Object's base color

void main()
{
    // ambient lighting
    float ambientStrength = 0.1;
    vec3 ambient = ambientStrength * lightColor;
    
    // diffuse lighting
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos); // Direction from fragment to light
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = diff * lightColor;
    
    // specular lighting
    float specularStrength = 0.5;
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32); // Shininess = 32
    vec3 specular = specularStrength * spec * lightColor;
    
    // combine all for final
    vec3 result = (ambient + diffuse + specular) * objectColor;
    color = vec4(result, 1.0);
}
