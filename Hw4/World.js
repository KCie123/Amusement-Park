// Karol Cieslikowski
// kciesl4@uic.edu

class World {    
    merryGoRound;
    floor = [];    
    floorTexture;

    constructor() {             
        this.merryGoRound = new MerryGoRound();   
         
        // create the floor using 100 cubes
        for (var i = 0; i < 10; ++i) 
        {
            this.floor.push([]);
            for (var j = 0; j < 10; ++j)
            {
                this.floor[i].push(new Cube(vec3(0.8, 0.6, 0.1)));
            }
        }

        this.floorTexture = loadTexture("bricks.png"); 
    }

    render(time, projectionMatrix, viewMatrix) {
        // Set shaders uniforms
        gl.uniformMatrix4fv(
            gl.getUniformLocation(program, "uProjectionMatrix"),
            false,
            flatten(projectionMatrix)
        );
        gl.uniformMatrix4fv(
            gl.getUniformLocation(program, "uViewMatrix"),
            false,
            flatten(viewMatrix)
        );
    
        gl.uniformMatrix4fv(
            gl.getUniformLocation(program, "uModelMatrix"),
            false,
            flatten(mat4())		
        );      
        
        // Tell WebGL we want to affect texture unit 3
        gl.activeTexture(gl.TEXTURE3);
        // Bind the texture to texture unit 3
        gl.bindTexture(gl.TEXTURE_2D, this.floorTexture);
        // Tell the shader we bound the texture to texture unit 3
        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 3);
        
        for (var i = 0; i < 10; ++i) 
        {
            this.floor.push([]);
            for (var j = 0; j < 10; ++j)
            {
                var x = i * 10 - 50;
                var z = j * 10 - 50;
                var floorMatrix = mult(translate(x, -3, z), scalem(10.0, 0.05, 10.0));
                this.floor[i][j].render(floorMatrix);
            }
        }

        // Draw MerryGoRound    
        this.merryGoRound.render(time);
    }
}