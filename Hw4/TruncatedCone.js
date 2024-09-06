// Karol Cieslikowski
// kciesl4@uic.edu

class TruncatedCone {
    static HEIGHT = 1.0;
    static BASE = 1.0 / 2;
    vertices = [];
    colors = [];    
    normals = [];
    texCoord = [];
    vPositionId;
    vColorId;
    vNormalId;
    vTexCoordId;

    constructor(ratio, sectors, color) {
        if (ratio < 0.0 || ratio > 1.0) {
            throw "TruncatedCone(): invalid ratio";
        }

        if (sectors < 3) {
            throw "TruncatedCone(): invalid number of sectors";
        }

        var HEIGHT = TruncatedCone.HEIGHT;
        var BASE = TruncatedCone.BASE;

        var TOP = BASE * ratio;
        var STEP = (360 / sectors) * (Math.PI / 180);

        var triNormals = [];

        // Create array of vertices
        for (var i = 0; i < sectors; ++i) {
            var a0 = i * STEP;
            var a1 = (i + 1) * STEP;

            var p1 = vec3(BASE * Math.cos(a0), 0.0, BASE * Math.sin(a0));
            var p2 = vec3(TOP * Math.cos(a0), HEIGHT, TOP * Math.sin(a0));

            var p3 = vec3(BASE * Math.cos(a1), 0.0, BASE * Math.sin(a1));
            var p4 = vec3(TOP * Math.cos(a1), HEIGHT, TOP * Math.sin(a1));

            var p5 = vec3(0, 0, 0); // center on the base
            var p6 = vec3(0, HEIGHT, 0); // center on the top

            // Each sector consists of 4 triangles
            //
            //      Base
            //       * p5
            //      * *
            //     * 3 *
            // p1 ******* p3
            //    **  2 *
            //    * *   *
            //    *  *  *
            //    * 1  **
            // p2 ******* p4
            //     * 4 *
            //      * *
            //       * p6
            //      Top

            // Triangle 1
            this.vertices.push(p1);
            this.vertices.push(p2);
            this.vertices.push(p4);
            var n1 = cross(subtract(p4, p2), subtract(p1, p2)); // normal            
            triNormals.push(n1);

            // Triangle 2
            this.vertices.push(p1);
            this.vertices.push(p3);
            this.vertices.push(p4);
            var n2 = cross(subtract(p1, p3), subtract(p4, p3)); // normal            
            triNormals.push(n2);

            // Base triangle
            this.vertices.push(p1);
            this.vertices.push(p3);
            this.vertices.push(p5);
            var n3 = cross(subtract(p1, p5), subtract(p3, p5)); // normal
            triNormals.push(n3);

            // Top triangle
            this.vertices.push(p2);
            this.vertices.push(p4);
            this.vertices.push(p6);
            var n4 = cross(subtract(p6, p2), subtract(p4, p6)); // normal
            triNormals.push(n4);

            // apply random color for whole sector
            //var cl = randColor();
            for (var j = 0; j < 12; ++j) {
                this.colors.push(color);
            }
        }

        // calculate vertex normals
        // the vertex normal is equal to the averaged sum of the normals of incident triangles
        for (var i = 0; i < sectors; ++i) {

            var next = (i + 1) % sectors;
            var prev = (i + sectors - 1) % sectors;

            // triangles of the current sector
            var n1_curr = triNormals[i * 4 + 0];
            var n2_curr = triNormals[i * 4 + 1];
            var n3_curr = triNormals[i * 4 + 2];
            var n4_curr = triNormals[i * 4 + 3];

            // triangles of the next sector
            var n1_next = triNormals[next * 4 + 0];
            var n2_next = triNormals[next * 4 + 1];
            var n3_next = triNormals[next * 4 + 2];
            var n4_next = triNormals[next * 4 + 3];

            // triangles of the previous sector
            var n1_prev = triNormals[prev * 4 + 0];
            var n2_prev = triNormals[prev * 4 + 1];
            var n3_prev = triNormals[prev * 4 + 2];
            var n4_prev = triNormals[prev * 4 + 3];

            // p1 normal
            var n1 = add(n1_curr, add(n2_curr, add(n3_curr, add(n2_prev, n3_prev))));
            n1 = normalize(n1);

            // p2 normal
            var n2 = add(n1_curr, add(n4_curr, add(n1_prev, add(n2_prev, n4_prev))));
            n2 = normalize(n2);

            // p3 normal
            var n3 = add(n2_curr, add(n3_curr, add(n1_next, add(n2_next, n3_next))));
            n3 = normalize(n3);

            // p4 normal
            var n4 = add(n1_curr, add(n2_curr, add(n4_curr, add(n1_next, n4_next))));
            n4 = normalize(n4);

            // p5 normal
            //var n5 = vec3(0.0, 0.0, 0.0);
            //for (var j = 0; j < sectors; ++j) {
            //    n5 = add(n5, triNormals[i * 4 + 2]);
            //}
            //n5 = normalize(n5); // n5 = (0;-1;0)
            var n5 = vec3(0, -1, 0);

            // p6 normal
            //var n6 = vec3(0.0, 0.0, 0.0);
            //for (var j = 0; j < sectors; ++j) {
            //    n6 = add(n6, triNormals[i * 4 + 3]);
            //}
            //n6 = normalize(n6); // n6 = (0;+1;0)
            var n6 = vec3(0, 1, 0);

            // Triangle 1
            this.normals.push(n1);
            this.normals.push(n2);
            this.normals.push(n4);

            // Triangle 2
            this.normals.push(n1);
            this.normals.push(n3);
            this.normals.push(n4);

            // Base Triangle
            this.normals.push(n1);
            this.normals.push(n3);
            this.normals.push(n5);

            // Top Triangle
            this.normals.push(n2);
            this.normals.push(n4);
            this.normals.push(n6);
        }        

        // calculate texture coords        
        for (var i = 0; i < sectors; ++i) {
            const s = 1.0 / sectors;
            const x1 = s * i;
            const x2 = s * (i + 1); 

            // Triangle 1
            this.texCoord.push(vec2(x1, 0.25));
            this.texCoord.push(vec2(x1, 0.75));
            this.texCoord.push(vec2(x2, 0.75));

            // Triangle 2
            this.texCoord.push(vec2(x1, 0.25));
            this.texCoord.push(vec2(x2, 0.75));
            this.texCoord.push(vec2(x2, 0.75));

            // Base Triangle
            this.texCoord.push(vec2(x1, 0.25));
            this.texCoord.push(vec2(x2, 0.25));
            this.texCoord.push(vec2((x1 + x2) / 2, 0.0));

            // Top Triangle
            this.texCoord.push(vec2(x1, 0.75));
            this.texCoord.push(vec2(x2, 0.75));
            this.texCoord.push(vec2((x1 + x2) / 2, 1.0));
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