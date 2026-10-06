// ============================================================
// SLICE RUSH 3D
// STEP 3 - SCENE / CAMERA / LIGHT / GROUND
// ============================================================

const CONFIG = {\n    GALLERY: true,
    // -------------------------
    // Debug
    // -------------------------
    DEBUG: true,

    // -------------------------
    // Scene
    // -------------------------
    backgroundColor: 0x050816,

    fogEnabled: true,
    fogNear: 18,
    fogFar: 45,

    // -------------------------
    // Camera
    // -------------------------
    cameraFov: 60,

    cameraPosition: {
        x: 0,
        y: 2,
        z: 9
    },

    cameraLookAt: {
        x: 0,
        y: 1,
        z: 0
    },

    // Wide-screen camera adjustment
    wideScreenRatio: 0.75,
    wideScreenFov: 68,

    // -------------------------
    // Spawn area
    // -------------------------
    spawnZ: -18,

    spawnMinX: -4,
    spawnMaxX: 4,

    spawnY: 3,

    // -------------------------
    // Miss line
    // -------------------------
    missLineY: -4,

    // -------------------------
    // Ground
    // -------------------------
    groundY: -4,

    groundSize: 30,

    // -------------------------
    // Renderer
    // -------------------------
    maxPixelRatio: 1.5,

    // Maximum frame time.
    // Prevents a big jump after
    // the phone pauses/resumes.
    maxDeltaTime: 0.05,

    // -------------------------
    // Debug update speed
    // -------------------------
    debugUpdateInterval: 0.25
};


// ============================================================
// THREE.JS CHECK
// ============================================================

const statusElement = document.getElementById("status");
const debugElement = document.getElementById("debug");
const stateButton = document.getElementById("stateButton");

if (typeof THREE === "undefined") {
    statusElement.textContent = "Three.js NOT FOUND";
    statusElement.style.color = "#ff5555";

    debugElement.style.display = "none";
    stateButton.style.display = "none";

    throw new Error(
        "Three.js was not loaded. Check lib/three.min.js"
    );
}


// ============================================================
// GAME STATES
// ============================================================

const GAME_STATE = {
    MENU: "MENU",
    PLAYING: "PLAYING",
    PAUSED: "PAUSED",
    GAMEOVER: "GAMEOVER"
};

let currentState = GAME_STATE.PLAYING;


// ============================================================
// BASIC THREE.JS OBJECTS
// ============================================================

let scene;
let camera;
let renderer;

let ground;
let directionalLight;
let ambientLight;

let clock;

let elapsedTime = 0;

let debugTimer = 0;

let objectCount = 0;

let currentFps = 60;


// ============================================================
// INITIALIZE
// ============================================================

initialize();


// ============================================================
// INITIALIZE GAME
// ============================================================

function initialize() {
    statusElement.textContent = "Three.js OK";
    statusElement.style.color = "#55ff88";

    createScene();
    createCamera();
    createLights();
    createRenderer();

    clock = new THREE.Clock();

    if (CONFIG.GALLERY) {
        window.addEventListener("resize", handleResize);
        handleResize();
        initializeGallery(scene, camera, renderer);
        debugElement.style.display =
            CONFIG.DEBUG ? "block" : "none";
        updateDebug();
        return;
    }

    createGround();
    createBackground();

    updateDebug();

    stateButton.addEventListener("click", cycleGameState);

    window.addEventListener("resize", handleResize);

    handleResize();

    requestAnimationFrame(gameLoop);
}
// ============================================================
// SCENE
// ============================================================

function createScene() {
    scene = new THREE.Scene();

    scene.background = new THREE.Color(
        CONFIG.backgroundColor
    );

    if (CONFIG.fogEnabled) {
        scene.fog = new THREE.Fog(
            CONFIG.backgroundColor,
            CONFIG.fogNear,
            CONFIG.fogFar
        );
    }
}


// ============================================================
// CAMERA
// ============================================================

function createCamera() {
    camera = new THREE.PerspectiveCamera(
        CONFIG.cameraFov,
        window.innerWidth / window.innerHeight,
        0.1,
        100
    );

    camera.position.set(
        CONFIG.cameraPosition.x,
        CONFIG.cameraPosition.y,
        CONFIG.cameraPosition.z
    );

    camera.lookAt(
        CONFIG.cameraLookAt.x,
        CONFIG.cameraLookAt.y,
        CONFIG.cameraLookAt.z
    );
}


// ============================================================
// LIGHTS
// ============================================================

function createLights() {
    directionalLight = new THREE.DirectionalLight(
        0xffffff,
        1.2
    );

    directionalLight.position.set(
        -4,
        8,
        6
    );

    directionalLight.target.position.set(
        0,
        1,
        0
    );

    scene.add(directionalLight);
    scene.add(directionalLight.target);

    ambientLight = new THREE.AmbientLight(
        0x6688aa,
        0.45
    );

    scene.add(ambientLight);
}


// ============================================================
// GROUND
// ============================================================

function createGround() {
    const geometry = new THREE.PlaneGeometry(
        CONFIG.groundSize,
        CONFIG.groundSize
    );

    const material = new THREE.MeshLambertMaterial({
        color: 0x101b2e
    });

    ground = new THREE.Mesh(
        geometry,
        material
    );

    ground.rotation.x = -Math.PI / 2;

    ground.position.y = CONFIG.groundY;

    scene.add(ground);
}


// ============================================================
// SIMPLE BACKGROUND
// ============================================================

function createBackground() {
    const geometry = new THREE.BoxGeometry(
        0.15,
        4,
        0.15
    );

    const material = new THREE.MeshBasicMaterial({
        color: 0x172640
    });

    const positions = [
        [-5, -2, -12],
        [5, -2, -12],
        [-7, -2, -20],
        [7, -2, -20]
    ];

    for (let i = 0; i < positions.length; i++) {
        const pillar = new THREE.Mesh(
            geometry,
            material
        );

        pillar.position.set(
            positions[i][0],
            positions[i][1],
            positions[i][2]
        );

        scene.add(pillar);
    }
}


// ============================================================
// RENDERER
// ============================================================

function createRenderer() {
    renderer = new THREE.WebGLRenderer({
        antialias: false,
        powerPreference: "high-performance"
    });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            CONFIG.maxPixelRatio
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document.body.appendChild(
        renderer.domElement
    );
}


// ============================================================
// RESIZE
// ============================================================

function handleResize() {
    if (!camera || !renderer) {
        return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

    const aspect = width / height;

    let newFov = CONFIG.cameraFov;

    if (aspect > CONFIG.wideScreenRatio) {
        newFov = CONFIG.wideScreenFov;
    }

    camera.fov = newFov;
    camera.aspect = aspect;

    camera.updateProjectionMatrix();

    renderer.setSize(
        width,
        height
    );

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            CONFIG.maxPixelRatio
        )
    );
}


// ============================================================
// GAME LOOP
// ============================================================

function gameLoop() {
    requestAnimationFrame(gameLoop);

    let deltaTime = clock.getDelta();

    deltaTime = Math.min(
        deltaTime,
        CONFIG.maxDeltaTime
    );

    currentFps = currentFps * 0.9 + (1 / Math.max(deltaTime, 0.001)) * 0.1;

    elapsedTime += deltaTime;

    updateGame(deltaTime);

    renderer.render(
        scene,
        camera
    );

    updateDebugTimer(deltaTime);
}


// ============================================================
// GAME UPDATE
// ============================================================

function updateGame(deltaTime) {
    if (currentState === GAME_STATE.MENU) {
        return;
    }

    if (currentState === GAME_STATE.PAUSED) {
        return;
    }

    if (currentState === GAME_STATE.GAMEOVER) {
        return;
    }

    if (currentState === GAME_STATE.PLAYING) {
        updateTestAnimation(deltaTime);
    }
}


// ============================================================
// TEST ANIMATION
// ============================================================

function updateTestAnimation(deltaTime) {
    for (let i = 0; i < scene.children.length; i++) {
        const child = scene.children[i];

        if (
            child.isMesh &&
            child !== ground
        ) {
            if (
                child.geometry &&
                child.geometry.type === "BoxGeometry"
            ) {
                child.rotation.y += (
                    deltaTime * 0.15
                );
            }
        }
    }
}


// ============================================================
// GAME STATE TEST
// ============================================================

function cycleGameState() {
    if (currentState === GAME_STATE.PLAYING) {
        currentState = GAME_STATE.PAUSED;
    } else if (
        currentState === GAME_STATE.PAUSED
    ) {
        currentState = GAME_STATE.MENU;
    } else if (
        currentState === GAME_STATE.MENU
    ) {
        currentState = GAME_STATE.GAMEOVER;
    } else {
        currentState = GAME_STATE.PLAYING;
    }

    updateDebug();
}


// ============================================================
// DEBUG
// ============================================================

function updateDebugTimer(deltaTime) {
    if (!CONFIG.DEBUG) {
        return;
    }

    debugTimer += deltaTime;

    if (
        debugTimer >=
        CONFIG.debugUpdateInterval
    ) {
        debugTimer = 0;

        updateDebug();
    }
}


function updateDebug() {
    if (!CONFIG.DEBUG) {
        debugElement.style.display = "none";
        return;
    }

    debugElement.style.display = "block";

    const fps = Math.round(currentFps);

    debugElement.innerHTML =
        "FPS: " + fps +
        "<br>Objects: " + objectCount +
        "<br>State: " + currentState;
}
