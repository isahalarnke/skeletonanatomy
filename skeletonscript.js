main();

function main() {
  let raycaster = new THREE.Raycaster();
  let mouse = new THREE.Vector2();
  let intersected;
  let labelsVisible = false;
  let labelObjects = [];
  let quizmode = false;

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
  camera.position.set(-10, 1, 20);
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

  const models = {};

  function loadGLTFModel(modelPath, scene, parent) {
    const latinName = modelPathAndNames[modelPath];

    console.log(latinName);

    gltflLoader.load(
      modelPath,
      function (gltf) {
        // Anpegasst an die Szene, damit das Skelett etwas weiter links steht
        gltf.scene.scale.set(2, 2, 2);
        gltf.scene.position.y -= 6;
        gltf.scene.position.x -= 3;
        gltf.scene.rotation.y = -Math.PI / 6;
        gltf.scene.userData.modelKey = latinName; // Das Model verfügt dann über einen Key

        scene.add(gltf.scene);
        skeleton.push(gltf.scene);
        models[latinName] = gltf.scene;
        createModelControl(latinName, gltf.scene);

        let positionOffset;
        switch (latinName) {
          case "Columna vertebralis":
            positionOffset = new THREE.Vector3(1.8, 2.4, 0.5);
            break;
          case "Cranium":
            positionOffset = new THREE.Vector3(2.8, 1, 0);
            break;
          case "Coxa":
            positionOffset = new THREE.Vector3(2.8, 2.5, 0.1);
            break;
          case "Humerus sinistrum":
            positionOffset = new THREE.Vector3(2.8, 1.5, 0);
            break;
          case "Antebrachium sinistrum":
            positionOffset = new THREE.Vector3(2, 2.5, 0);
            break;
          case "Manus sinistra":
            positionOffset = new THREE.Vector3(2, 3.2, 0);
            break;
          case "Humerus dextrum":
            positionOffset = new THREE.Vector3(1.7, 1.5, 0);
            break;
          case "Antebrachium dextrum":
            positionOffset = new THREE.Vector3(1.7, 2.5, 0);
            break;
          case "Manus dextra":
            positionOffset = new THREE.Vector3(2.7, 3.3, 0);
            break;
          case "Thorax":
            positionOffset = new THREE.Vector3(2.7, 1, 0.7);
            break;
          case "Femur dextrum":
            positionOffset = new THREE.Vector3(1.5, 3.3, 0);
            break;
          case "Crus dextrum":
            positionOffset = new THREE.Vector3(1.8, 4.85, 0);
            break;
          case "Genu dextrum":
            positionOffset = new THREE.Vector3(1.5, 4.3, 0);
            break;
          case "Pes dexter":
            positionOffset = new THREE.Vector3(2, 5.8, 0);
            break;
          case "Femur sinistrum":
            positionOffset = new THREE.Vector3(3, 3.3, 0);
            break;
          case "Crus sinistrum":
            positionOffset = new THREE.Vector3(3, 4.8, 0);
            break;
          case "Genu sinistrum":
            positionOffset = new THREE.Vector3(3, 4.3, 0);
            break;
          case "Pes sinister":
            positionOffset = new THREE.Vector3(3, 5.7, 0);
            break;
          default:
            positionOffset = new THREE.Vector3(0, 1, 0);
        }

        addLabel(latinName, gltf.scene, positionOffset);
      },
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      function (error) {
        console.log("An error happened");
      }
    );
  }

  const skeleton = []; // Für das gemeinsame Rotieren des gesamten Skelets in der Control Methode
  // Objektpfade im Array speichern und in einer Schleife laden

  const modelPathAndNames = {
    "objects/spine.glb": "Columna vertebralis",
    "objects/schaedel.glb": "Cranium",
    "objects/hips.glb": "Coxa",
    "objects/oberarmlinks.glb": "Humerus sinistrum",
    "objects/unterarmlinks.glb": "Antebrachium sinistrum",
    "objects/handlinks.glb": "Manus sinistra",
    "objects/oberarmrechts.glb": "Humerus dextrum",
    "objects/unterarmrechts.glb": "Antebrachium dextrum",
    "objects/handrechts.glb": "Manus dextra",
    "objects/ripcage.glb": "Thorax",
    "objects/oberschenkelleft.glb": "Femur dextrum",
    "objects/unterschenkelleft.glb": "Crus dextrum",
    "objects/knieleft.glb": "Genu dextrum",
    "objects/fussleft.glb": "Pes dexter",
    "objects/oberschenkelright.glb": "Femur sinistrum",
    "objects/unterschenkelright.glb": "Crus sinistrum",
    "objects/knieright.glb": "Genu sinistrum",
    "objects/fussright.glb": "Pes sinister",
  };

  Object.keys(modelPathAndNames).forEach((path) => loadGLTFModel(path, scene));

  //GUI Control
  var controls = new (function () {
    this.rotY = 0;
    this.allBodyparts = true;
  })();

  // GUI control zum Rotieren
  var gui = new dat.GUI();
  gui.add(controls, "rotY", 0, 2 * Math.PI);

  // GUI control zum Kästchen anticken, demnach Objekt sichtbar oder unsichtbar
  var guiVisibileControl = new dat.GUI();

  function createModelControl(name, model) {
    controls[name] = true;
    guiVisibileControl
      .add(controls, name)
      .name(name)
      .onChange(function (value) {
        model.visible = value;
      });
    controls.allVisible = Object.keys(models).every(
      (key) => models[key].visible
    );
    gui.__controllers.forEach(function (controller) {
      if (controller.property === "allVisible") {
        controller.updateDisplay();
      }
    });
  }

  // Hier alle verbergen oder sichtbar machen

  guiVisibileControl
    .add(controls, "allBodyparts")
    .name("Skeleton")
    .onChange(function (value) {
      Object.keys(models).forEach(function (key) {
        models[key].visible = value;
        controls[key] = value;
      });

      // Aktualisieren Sie die Anzeige für jede spezifische Kontrolle
      guiVisibileControl.__controllers.forEach(function (controller) {
        if (Object.keys(models).includes(controller.property)) {
          controller.updateDisplay();
        }
      });
    });

  // Schriftart laden
  const fontLoader = new THREE.FontLoader();
  let loadedFont;
  fontLoader.load("libs/fonts/Roboto_Regular.json", (font) => {
    loadedFont = font;
  });

  // Beschriftungsfunktion mit 3D Fonts
  function addLabel(name, model, positionOffset = new THREE.Vector3(0, 0, 0)) {
    if (!loadedFont) {
      setTimeout(() => addLabel(name, model, positionOffset), 100);
      return;
    }

    const textGeometry = new THREE.TextGeometry(name, {
      size: 0.18,
      height: 0.1,
      font: loadedFont,
    });
    const textMaterial = new THREE.MeshPhongMaterial({
      color: 0xff22ff,
      shininess: 20,
    });

    const textMesh = new THREE.Mesh(textGeometry, textMaterial);

    const boundingBox = new THREE.Box3().setFromObject(model);
    const modelHeight = boundingBox.max.y - boundingBox.min.y;
    textMesh.position.copy(boundingBox.getCenter(new THREE.Vector3()));
    textMesh.position.add(positionOffset);
    textMesh.visible = labelsVisible;
    labelObjects.push(textMesh);
    model.add(textMesh);
    //scene.add(textMesh);
  }

  //Trackball Control mit der Maus
  var trackballControls = new THREE.TrackballControls(camera, canvas);
  var clock = new THREE.Clock();

  //Listener für die Mouse
  document.addEventListener("mousemove", mouseHover, false);

  //Listener für das Button Beschriftung Event
  document.getElementById("labelshow").addEventListener("click", function () {
    labelsVisible = !labelsVisible;
    labelObjects.forEach((label) => {
      label.visible = labelsVisible;
    });
  });

  //QUIZ zugehörigen Funktionen
  let question = null;
  let score = 0;
  const bodyParts = Object.keys(modelPathAndNames);
  const quizQuestionShow = document.getElementById("quiz-questions");
  const quizButton = document.getElementById("quiz");
  let trials = 0;
  
  function quiz() {
    score = 0;
    trials = 0;
    quizmode = true;
    quizQuestionShow.style.display = "block";
    quizButton.style.backgroundColor = "#ff0000";
    quizButton.textContent = "Stop Quiz";
    quizQuestion();
  }

  function quizQuestion() {
    if(trials == 5){
      if(score == 5){
        alert("Alle richtig JUHU");
        return;
      }
      alert(`Quiz beendet. Du hast ${score}/10 richtig erkannt."`);
      quizmode = false;
      quizButton.textContent = "Start Quiz";
      quizButton.style.backgroundColor = "";
      quizQuestionShow.style.display = "none";
      return;
    }
    const randomIndex = Math.floor(Math.random() * bodyParts.length);
    question = bodyParts[randomIndex];
    const latinName = modelPathAndNames[question];

    quizQuestionShow.innerHTML = `Wo befindet sich <strong>${latinName}</strong>?`;
  }

  //Listener für den Quiz Button
  document.addEventListener("click", function () {
    if(!quizmode) return;

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(Object.values(models), true);

    if (intersects.length > 0) {
      const intersectedObject = intersects[0].object;
      const clickedPart = intersectedObject.parent.userData.modelKey;

      if (clickedPart === modelPathAndNames[question]) {
        score++;
        alert(`Richtig! Dein Punktestand ist: ${score}`);
      } else {
        alert(`Falsch!`);
      }

      question = null;
      trials++;
      quizQuestion();
    }
  });

  quizButton.addEventListener("click", function () {
    if (!quizmode) {
      quiz();
    } else {
      quizmode = false;
      quizButton.textContent = "Start Quiz";
      quizButton.style.backgroundColor = "";
      quizQuestionShow.style.display = "none";
    }
  });

  function mouseHover(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    let intersects = raycaster.intersectObjects(Object.values(models), true);
    const label = document.getElementById("label");

    if (intersects.length > 0) {
      let intersectedObject = intersects[0].object;
      if (intersected !== intersectedObject) {
        if (intersected)
          intersected.material.color.setHex(intersected.currentHex);
        intersected = intersectedObject;
        intersected.currentHex = intersected.material.color.getHex();
        intersected.material.color.setHex(0x800080);
      }
      if (!quizmode && !labelsVisible) {
        label.style.display = "block";
        label.style.left = event.clientX + 10 + "px";
        label.style.top = event.clientY + 10 + "px";
        label.textContent = intersected.parent.userData.modelKey || "Incorrect";
      }
    } else {
      if (intersected)
        intersected.material.color.setHex(intersected.currentHex);
      intersected = null;
      label.style.display = "none";
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

    skeleton.forEach((skeleton) => {
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
  stats.domElement.style.position = "absolute";
  stats.domElement.style.left = "0px";
  stats.domElement.style.top = "0px";
  document.body.appendChild(stats.domElement);
  return stats;
}
