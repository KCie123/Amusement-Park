# Amusement Park Scene

This WebGL-based project renders a 3D amusement park scene, complete with a rotating merry-go-round, textured horses, and various other scene elements. The textures are applied to different objects using WebGL shaders and texture mapping.

## Project Description
The amusement park scene includes a carousel with horses, pillars, and a rotating top/bottom structure. The scene also features camera controls that allow users to move and rotate the camera for a dynamic view of the scene. The project implements texture mapping to give the scene a realistic feel by using different textures such as wood, zebra stripes, plastic, and bricks.

### Key Features:
- **Merry-Go-Round:** A rotating carousel with horses and structural components.
- **Texture Mapping:** Textures applied to the horses, floor, and other components using WebGL shaders.
- **Camera Controls:** Allows users to move the camera around the scene using keyboard controls for a dynamic view.
- **Scene Elements:** Includes detailed components like horses, pillars, floor, and top/bottom cubes of the carousel.

## Technologies Used:
- **HTML5:** Structure of the WebGL canvas and UI.
- **WebGL:** Used for 3D rendering, lighting, and texture mapping.
- **JavaScript (ES6):** Handles rendering logic, input handling, and WebGL interaction.
- **Textures:** Different image textures such as bricks, wood, zebra patterns, and plastic are mapped onto objects.

## How to Install and Run the Project

### Prerequisites
- A modern web browser with WebGL support (e.g., Chrome, Firefox)

### Steps
1. Clone the Repository:
   ```bash
   git clone https://github.com/yourusername/amusement-park-scene.git
   cd amusement-park-scene

2. Open the HW4.html file in your web browser.

3. Use the following controls to navigate:
   ```bash
      W/S: Move camera forward/backward
      A/D: Rotate camera left/right
      Shift + A/D: Slide camera left/right
      Arrow Up/Down: Rotate camera up/down
      R: Reset camera to default position
      Q: Quit the program
      H or ?: Show help message
   
## How to Use the Project
-Once the scene is loaded, the carousel will rotate automatically.
-Use the camera controls to explore the scene.

Amusement Park Scene
│
├── index.html        # Main HTML file for the WebGL canvas
├── HW4.js            # Main JavaScript file for rendering the scene and handling input
├── Cube.js           # Contains the Cube class for rendering cubes
├── TruncatedCone.js  # Contains the TruncatedCone class for rendering horses and pillars
├── MerryGoRound.js   # Contains the MerryGoRound class for the carousel logic
├── World.js          # Manages the overall scene and floor rendering
├── textures
│   ├── wood.png      # Texture for the carousel wood parts
│   ├── zebra.png     # Texture for the carousel horses
│   ├── bricks.png    # Texture for the floor
│   ├── plastic.png   # Texture for the top cube
└── Common            # Utility files for WebGL (e.g., shader initialization)
