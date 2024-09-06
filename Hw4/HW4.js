// Karol Cieslikowski
// kciesl4@uic.edu

var gl;
var program;

var world;

var time = 0.0;
var deltaTime = 0;
var then = 0;

const DEFAULT_CAMERA_POS = vec3(0, 0, 15);
const DEFAULT_CAMERA_FRONT = vec3(0, 0, -1);
const DEFAULT_CAMERA_YAW = -90;
const DEFAULT_CAMERA_PITCH = 0;

var cameraPos = DEFAULT_CAMERA_POS;
var cameraFront = DEFAULT_CAMERA_FRONT;
const cameraUp = vec3(0, 1, 0);
var cameraYaw = DEFAULT_CAMERA_YAW;
var cameraPitch = DEFAULT_CAMERA_PITCH;
var quit = false;

// Generates a random coordinates in [-1;1] range
function randCoord() {
	return vec3(2.0 * Math.random() - 1.0, 2.0 * Math.random() - 1.0, 2.0 * Math.random() - 1.0);
}

// Generates a random color
function randColor() {
	return vec3(Math.random(), Math.random(), Math.random());
}

function Mult(v, m) {
	return vec3(v[0] * m, v[1] * m, v[2] * m);
}

function loadTexture(src)
{
	// Create a texture.
	const texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);        
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
	// Asynchronously load an image
	const image = new Image(); 
	image.src = src;       
	image.addEventListener('load', function() {           
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
		//gl.generateMipmap(gl.TEXTURE_2D);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	});
	return texture;
}

window.onload = function init() {
	try {
		var canvas = document.getElementById("gl-canvas");

		gl = WebGLUtils.setupWebGL(canvas);
		if (!gl) { throw "WebGL isn't available"; }

		// Set key event listener
		canvas.addEventListener('keydown', (e) => {
			onKeyDown(e.key.toLowerCase(), e.shiftKey);
		});

		//  Configure WebGL

		gl.viewport(0, 0, canvas.width, canvas.height);
		gl.clearColor(0.0, 0.6, 0.9, 1.0);
		gl.enable(gl.DEPTH_TEST); // Enable depth testing

		//  Load shaders
		program = initShaders(gl, "vertex-shader", "fragment-shader");
		gl.useProgram(program);

		// Create the scene
		world = new World();		

		// render the animated scene
		requestAnimationFrame(render);
	} catch (e) {
		alert(e);
	}
};

// Render the scene
function render(now) {
	now *= 0.001;
	deltaTime = now - then;
	then = now;

	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

	// Set the projection matrix
	const fieldOfView = 60; // in degrees
	const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
	const zNear = 0.1;
	const zFar = 1000.0;

	const projectionMatrix = perspective(fieldOfView, aspect, zNear, zFar);

	// Set the view matrix
	var front = vec3();
	front[0] = Math.cos(radians(cameraYaw)) * Math.cos(radians(cameraPitch));
	front[1] = Math.sin(radians(cameraPitch));
	front[2] = Math.sin(radians(cameraYaw)) * Math.cos(radians(cameraPitch));
	cameraFront = normalize(front);

	const viewMatrix = lookAt(cameraPos, add(cameraPos, cameraFront), cameraUp);	

	gl.uniform3iv(
		gl.getUniformLocation(program, "uCamera"),
		cameraPos
	);

	// render the scene
	world.render(time, projectionMatrix, viewMatrix);

	time += deltaTime;

	if (!quit) {
		requestAnimationFrame(render);
	}
	
}

// Process input
function onKeyDown(key, shift) {
	const cameraSpeed = 0.05;

	if (key === 'w') {
		cameraPos = add(cameraPos, Mult(cameraFront, cameraSpeed));
	} else if (key === 'a' && shift) {
		cameraPos = subtract(cameraPos, Mult(normalize(cross(cameraFront, cameraUp)), cameraSpeed));
	} else if (key === 's') {
		cameraPos = subtract(cameraPos, Mult(cameraFront, cameraSpeed));
	} else if (key === 'd' && shift) {
		cameraPos = add(cameraPos, Mult(normalize(cross(cameraFront, cameraUp)), cameraSpeed));
	} else if (key === 'a' && !shift) {
		cameraYaw -= cameraSpeed * 10;		
	} else if (key === 'd' && !shift) {
		cameraYaw += cameraSpeed * 10;
	} else if (key === 'arrowup') {
		cameraPitch += cameraSpeed * 10;
	} else if (key === 'arrowdown') {
		cameraPitch -= cameraSpeed * 10;
	} else if (key === 'r') {
		cameraPos = DEFAULT_CAMERA_POS;
		cameraFront = DEFAULT_CAMERA_FRONT;		
		cameraYaw = DEFAULT_CAMERA_YAW;
		cameraPitch = DEFAULT_CAMERA_PITCH;
	} else if (key === 'q') {
		quit = true;
	} else if (key === 'h' || key === "?") {
		var info = "W - move forwards\n";
		info += "S - move backwards\n";
		info += "A - rotate left\n";
		info += "D - rotate right\n";
		info += "Shift + A - slide left\n";
		info += "Shift + D - slide right\n";
		info += "Up Arrow - rotate up\n";
		info += "Down Arrow - rotate down\n";
		info += "R - reset camera\n";
		info += "H or ? - display this message\n";
		info += "Q - quit the program\n";
		alert(info);
	}
}