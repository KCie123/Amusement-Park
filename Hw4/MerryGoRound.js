// Karol Cieslikowski
// kciesl4@uic.edu

class MerryGoRound {
    static RADIUS = 4.0;
    static NUM_OF_HORSES = 12;    
    horses = [];
    pillars = [];
    topBottom = [];
    cube;
    texture0;
    texture1;
    texture2;    

    constructor() {
        for (var i = 0; i < MerryGoRound.NUM_OF_HORSES; ++i) {            
            this.horses.push(new TruncatedCone(Math.random(), 36, randColor()));
            this.pillars.push(new TruncatedCone(1.0, 36, randColor()));
        }

        this.topBottom.push(new TruncatedCone(0, 36, randColor()));
        this.topBottom.push(new TruncatedCone(0, 36, randColor()));

        this.cube = new Cube(vec3(0.0, 1.0, 0.0));

        this.texture0 = loadTexture("zebra.png");
        this.texture1 = loadTexture("wood.png");
        this.texture2 = loadTexture("plastic.png");
    }

    render(rotation) {        
        var radius = MerryGoRound.RADIUS;        
        var step = 360 / MerryGoRound.NUM_OF_HORSES;        

        var modelMatrix = mult(translate(0, 0, -radius * 0), rotateY(60 * rotation));

        
        // Tell WebGL we want to affect texture unit 1
        gl.activeTexture(gl.TEXTURE1);
        // Bind the texture to texture unit 1
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        // Tell the shader we bound the texture to texture unit 1
        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 1);

        // render pillars
        for (var i = 0; i < MerryGoRound.NUM_OF_HORSES; ++i) {
            var a = i * step - step * 0.2;            
            var pos = vec3(radius * Math.cos(radians(a)), -3, radius * Math.sin(radians(a)));

            var pillarModelMatrix = mult(translate(pos), scalem(0.1, 6.0, 0.1));

            this.pillars[i].render(mult(modelMatrix, pillarModelMatrix));            
        }

        // Tell WebGL we want to affect texture unit 0
        gl.activeTexture(gl.TEXTURE0);
        // Bind the texture to texture unit 0
        gl.bindTexture(gl.TEXTURE_2D, this.texture0);
        // Tell the shader we bound the texture to texture unit 0
        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 0);
        
        // render horses
        for (var i = 0; i < MerryGoRound.NUM_OF_HORSES; ++i) {
            var a = i * step;            
            var h = Math.sin(radians(a));
            var pos = vec3(radius * Math.cos(radians(a)), h * Math.sin(3 * rotation), radius * Math.sin(radians(a)));

            var horseModelMatrix = mult(translate(pos), mult(rotateX(270), rotateZ(-a)));

            this.horses[i].render(mult(modelMatrix, horseModelMatrix));            
        }

        // Tell WebGL we want to affect texture unit 1
        gl.activeTexture(gl.TEXTURE1);
        // Bind the texture to texture unit 1
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        // Tell the shader we bound the texture to texture unit 1
        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 1);

        var topModelMatrix = mult(translate(0, 3, 0), mult(rotateZ(180), scalem(9.0, 0.5, 9.0)));
        this.topBottom[0].render(mult(modelMatrix, topModelMatrix));

        var bottomModelMatrix = mult(translate(0, -3, 0), scalem(9.0, 0.5, 9.0));
        this.topBottom[1].render(mult(modelMatrix, bottomModelMatrix));

        
        
        // Tell WebGL we want to affect texture unit 2
        gl.activeTexture(gl.TEXTURE2);
        // Bind the texture to texture unit 2
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);
        // Tell the shader we bound the texture to texture unit 2
        gl.uniform1i(gl.getUniformLocation(program, "uTexture"), 2);

        var cubeMatrix = mult(translate(0, 5, 0), mult(rotateX(45), rotateZ(45)));
        this.cube.render(mult(modelMatrix, cubeMatrix));
    }
}