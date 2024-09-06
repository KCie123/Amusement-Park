// Karol Cieslikowski
// kciesl4@uic.edu

class Cube {    
    vertices = [];
    colors = [];    
    normals = [];
    texCoord = [];
    vPositionId;
    vColorId;
    vNormalId;
    vTexCoordId;

    constructor(color) {        
        var p1 = vec3(-0.5, -0.5, 0.5);
        var p2 = vec3(-0.5, 0.5, 0.5);
        var p3 = vec3(0.5, 0.5, 0.5);
        var p4 = vec3(0.5, -0.5, 0.5);
        var p5 = vec3(-0.5, -0.5, -0.5);
        var p6 = vec3(-0.5, 0.5, -0.5);        
        var p7 = vec3(0.5, 0.5, -0.5);
        var p8 = vec3(0.5, -0.5, -0.5);

        var n1 = vec3(-0.5, -0.5, 0.5);
        var n2 = vec3(-0.5, 0.5, 0.5);
        var n3 = vec3(0.5, 0.5, 0.5);
        var n4 = vec3(0.5, -0.5, 0.5);
        var n5 = vec3(-0.5, -0.5, -0.5);
        var n6 = vec3(-0.5, 0.5, -0.5);        
        var n7 = vec3(0.5, 0.5, -0.5);
        var n8 = vec3(0.5, -0.5, -0.5);
        
        // Face

        // 1
        this.vertices.push(p1);
        this.vertices.push(p2);
        this.vertices.push(p3);    
        this.normals.push(normalize(n1));  
        this.normals.push(normalize(n2));
        this.normals.push(normalize(n3));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(0.0, 1.0));
        this.texCoord.push(vec2(1.0, 1.0));

        // 2
        this.vertices.push(p1);
        this.vertices.push(p3);
        this.vertices.push(p4);
        this.normals.push(normalize(n1));  
        this.normals.push(normalize(n3));
        this.normals.push(normalize(n4));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(1.0, 1.0));
        this.texCoord.push(vec2(1.0, 0.0));
        
        // Top
        
        // 3
        this.vertices.push(p2);
        this.vertices.push(p6);
        this.vertices.push(p7);
        this.normals.push(normalize(n2));  
        this.normals.push(normalize(n6));
        this.normals.push(normalize(n7));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(0.0, 1.0));
        this.texCoord.push(vec2(1.0, 1.0));
        
        // 4
        this.vertices.push(p2);
        this.vertices.push(p7);
        this.vertices.push(p3);
        this.normals.push(normalize(n2));  
        this.normals.push(normalize(n7));
        this.normals.push(normalize(n3));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(1.0, 1.0));
        this.texCoord.push(vec2(1.0, 0.0));
        
        // Left

        // 5
        this.vertices.push(p1);
        this.vertices.push(p2);
        this.vertices.push(p6);
        this.normals.push(normalize(n1));  
        this.normals.push(normalize(n2));
        this.normals.push(normalize(n6));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(0.0, 1.0));
        this.texCoord.push(vec2(1.0, 1.0));

        // 6
        this.vertices.push(p1);
        this.vertices.push(p6);
        this.vertices.push(p5);
        this.normals.push(normalize(n1));  
        this.normals.push(normalize(n6));
        this.normals.push(normalize(n5));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(1.0, 1.0));
        this.texCoord.push(vec2(1.0, 0.0));

        // Right

        // 7
        this.vertices.push(p3);
        this.vertices.push(p4);
        this.vertices.push(p7);
        this.normals.push(normalize(n3));  
        this.normals.push(normalize(n4));
        this.normals.push(normalize(n7));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(0.0, 1.0));
        this.texCoord.push(vec2(1.0, 1.0));

        // 8
        this.vertices.push(p4);
        this.vertices.push(p7);
        this.vertices.push(p8);
        this.normals.push(normalize(n4));  
        this.normals.push(normalize(n7));
        this.normals.push(normalize(n8));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(1.0, 1.0));
        this.texCoord.push(vec2(1.0, 0.0));

        // Bottom

        // 9
        this.vertices.push(p1);
        this.vertices.push(p4);
        this.vertices.push(p8);
        this.normals.push(normalize(n1));  
        this.normals.push(normalize(n4));
        this.normals.push(normalize(n8));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(0.0, 1.0));
        this.texCoord.push(vec2(1.0, 1.0));

        // 10
        this.vertices.push(p1);
        this.vertices.push(p5);
        this.vertices.push(p8);
        this.normals.push(normalize(n1));  
        this.normals.push(normalize(n5));
        this.normals.push(normalize(n8));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(1.0, 1.0));
        this.texCoord.push(vec2(1.0, 0.0));

        // Back

        // 11
        this.vertices.push(p5);
        this.vertices.push(p6);
        this.vertices.push(p7);
        this.normals.push(normalize(n5));  
        this.normals.push(normalize(n6));
        this.normals.push(normalize(n7));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(0.0, 1.0));
        this.texCoord.push(vec2(1.0, 1.0));

        // 12
        this.vertices.push(p5);
        this.vertices.push(p7);
        this.vertices.push(p8);
        this.normals.push(normalize(n5));  
        this.normals.push(normalize(n7));
        this.normals.push(normalize(n8));
        this.texCoord.push(vec2(0.0, 0.0));
        this.texCoord.push(vec2(1.0, 1.0));
        this.texCoord.push(vec2(1.0, 0.0));
        
        //var cl = randColor();
        for (var j = 0; j < 36; ++j) {
            this.colors.push(color);
        }         

        this.vertices = flatten(this.vertices);
        this.colors = flatten(this.colors);
        this.normals = flatten(this.normals);
        this.texCoord = flatten(this.texCoord);

        // Load the data into the GPU

        // Setup vPosition buffer
        this.vPositionId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vPositionId);
        gl.bufferData(gl.ARRAY_BUFFER, this.vertices, gl.STATIC_DRAW);

        // Setup vColor buffer
        this.vColorId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vColorId);
        gl.bufferData(gl.ARRAY_BUFFER, this.colors, gl.STATIC_DRAW);

        // Setup vNormal buffer
        this.vNormalId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vNormalId);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        // Setup vTexCoord buffer
        this.vTexCoordId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vTexCoordId);
        gl.bufferData(gl.ARRAY_BUFFER, this.texCoord, gl.STATIC_DRAW);
    }

    render(modelMatrix) {
        // Set the shader uniform
        gl.uniformMatrix4fv(
            gl.getUniformLocation(program, "uModelMatrix"),
            false,
            flatten(modelMatrix)
        );

        // Create the normal matrix from the model matrix
        gl.uniformMatrix3fv(
            gl.getUniformLocation(program, "uNormalMatrix"),
            false,
            flatten(normalMatrix(modelMatrix, true))
        );

        // vPosition buffer   
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vPositionId);
        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        // vColor buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vColorId);
        var vColor = gl.getAttribLocation(program, "vColor");
        gl.vertexAttribPointer(vColor, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vColor);

        // vNormal buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vNormalId);
        var vNormal = gl.getAttribLocation(program, "vNormal");
        gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vNormal);

        // vTexCoord buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vTexCoordId);
        var vTexCoord = gl.getAttribLocation(program, "vTexCoord");                
        gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vTexCoord);

        // Draw
        gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length);
    }
}