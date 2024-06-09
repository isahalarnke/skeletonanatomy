main();

let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let intersected;

function main() {
  var stats = initStats();
  // create context
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
  });

  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // create camera
  const angleOfView = 45;
  const aspectRatio = canvas.clientWidth / canvas.clientHeight;
  const nearPlane = 0.2;
  const farPlane = 100;
  const camera = new THREE.PerspectiveCamera(
    angleOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );
  camera.position.set(-10, 1, 15);
  camera.rotation.y = Math.PI / 4;

  // create the scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0.1, 0.2, 0.1);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  var gltflLoader = new THREE.GLTFLoader();

  function loadGLTFModel(modelPath, scene, parent) {
    gltflLoader.load(
      modelPath,
      function (gltf) {
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.position.y -= 6;
        gltf.scene.position.x -= 3;
        gltf.scene.rotation.y = -Math.PI / 6;

    
        scene.add(gltf.scene);
        skeleton.push(gltf.scene);
        
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function (error) {
        console.log('An error happened');
      }
    );
  }
  
  const skeleton = [];
  // Objektpfade im Array speichern und in einer Schleife laden

  const modelPaths = [
    'objects/spine.glb',
    'objects/schaedel.glb',
    'objects/hips.glb',
    'objects/oberarmlinks.glb',
    'objects/unterarmlinks.glb',
    'objects/handlinks.glb',
    'objects/oberarmrechts.glb',
    'objects/unterarmrechts.glb',
    'objects/handrechts.glb',
    'objects/ripcage.glb',
    'objects/oberschenkelleft.glb',
    'objects/unterschenkelleft.glb',
    'objects/knieleft.glb',
    'objects/fussleft.glb',
    'objects/oberschenkelright.glb',
    'objects/unterschenkelright.glb',
    'objects/knieright.glb',
    'objects/fussright.glb'
  ];

  modelPaths.forEach(path => loadGLTFModel(path, scene));

  //GUI Control
  var controls = new (function () {
    this.rotY = 0;
  })();

  var gui = new dat.GUI();
  gui.add(controls, 'rotY', 0, 2 * Math.PI);
  

  //Trackball Control mit der Maus
  var trackballControls = new THREE.TrackballControls(camera, canvas);
  var clock = new THREE.Clock();

  //Listener für die Mouse
  document.addEventListener("mousemove", onDocumentMouseMove, false);

  function onDocumentMouseMove(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycaster verwenden, um zu erkennen, ob Maus über Objekt ist
    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      let intersectedObject = intersects[0].object;
      if (intersected != intersectedObject) {
        if (intersected) intersected.material.color.setHex(intersected.currentHex);
        intersected = intersectedObject;
        intersected.currentHex = intersected.material.color.getHex();
        intersected.material.color.setHex(0x800080); // Hover-Farbe momentan auf pink gesetzt
      }
    } else {
      if (intersected) intersected.material.color.setHex(intersected.currentHex);
      intersected = null;
    }
  }

  function animate() {
    if (resizeGLToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    trackballControls.update(clock.getDelta());
    stats.update();

    skeleton.forEach(skeleton => {
      skeleton.rotation.y = -controls.rotY;
    });
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
}

// UPDATE RESIZE

function resizeGLToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width != width || canvas.height != height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

function initStats() {
  var stats = new Stats();
  stats.setMode(0); // 0: fps, 1: ms
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';
  document.body.appendChild(stats.domElement);
  return stats;
}
