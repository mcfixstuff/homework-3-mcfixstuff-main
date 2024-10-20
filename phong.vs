#version 330 core
layout (location = 0) in vec3 position;  // Vertex position
layout (location = 1) in vec3 normal;    // Vertex normal

out vec3 Normal;    // Pass the transformed normal to the fragment shader
out vec3 FragPos;   // Pass the transformed fragment position to the fragment shader

uniform mat4 model;      // Model matrix
uniform mat4 view;       // View matrix
uniform mat4 projection; // Projection matrix

void main()
{
    // transform the vertex position to world space and pass to fragment shader
    FragPos = vec3(model * vec4(position, 1.0));

    // transform the normal to world space (account for non-uniform scaling)
    Normal = mat3(transpose(inverse(model))) * normal;

    // transform the vertex position to clip space for rendering
    gl_Position = projection * view * vec4(FragPos, 1.0);
}
