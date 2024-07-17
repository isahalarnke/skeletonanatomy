# skeletonanatomy
Three JS Anwendung: Lerntool für die menschliche Skelett-Anatomie

**Quellensammlung:**

- 3D-Skelett-Model aus CGtrader: https://www.cgtrader.com/free-3d-models/science/other/skeleton-4bc0a3e2-c1a9-4fad-8f7c-d4201d8b77dc , 20.05.2024
- Three.js Dokumentation: https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models 08.Juni 2024
- Creating text: https://threejs.org/docs/#manual/en/introduction/Creating-text 10.Juni 2024
- CSS diplay setting: https://www.w3schools.com/cssref/pr_class_display.php 12. Juni 2024
- CSS labels: https://www.htmlgoodies.com/css/css-labels-buttons-forms/ 12. Juni 2024
- Three JS Fontloader Tutorial: https://www.youtube.com/watch?v=l7K9AMnesJQ, SuboptimalEng Github: https://github.com/SuboptimalEng/three-js-tutorials 12, Juni 2024
- Three JS gtlf Loader: https://threejs.org/docs/#examples/en/loaders/GLTFLoader , 12. Juni 2024
- Raycaster und Mouse-Objekt Hovering/Intersection: https://threejs.org/docs/#api/en/core/Raycaster 3.Juni 2024
- Material aus den Übungen: AR and VR Using the WebXR API

**Aktuelle funktionale Anforderungen:**
[x] Skelett lässt sich ranzoomen und drehen mit Mouse Control --> TrackBallControl
[x] Control-Leiste mit Drehung
[x] Körperteil färbt sich, wenn man darüber hovered und Textfeld ploppt auf mit dem zugehörigen lateinischen Namen
[x] 3D-Textgeometry Beschriftungen der Knochen
[x] Button, der Beschriftungen an und ausschaltet
[x] Quiz-Funktion durch Quiz-Button starten (Stop Funktion)
[x] Frage --> das richtige Körperteil muss mit der Maus angegklickt werden
[x] Score Zähler im Hintergrund, der bei richtiger Antwort hochzählt
[x] Bei falscher Antwort wird das ursprünglich richtige Körperteil blau angefärbt
[x] Wenn alle Fragen gestellt wurden --> Übersicht des Scores
[x] bei erfolgreicher Leistung, wenn alle Fragen beantwortet wurden, Party Time mit Confetti Partikelsystem und Textfeld

**Vorgehensweise:**
- Modell in Blender importieren und die Körperteile einzeln ausschneiden (glb-Files) und wieder in die Szene laden (Gltf Loader)
- Schriftarten laden (FontLoader)
- Funktionalitäten/Logik implementieren
- Schirftarten, Beleuchtung, Hintergrund etc. setzen

**Lateinische Fachbegriffe:**
spine - Wirbelsäule (Columna vertebralis)
schaedel - Schädel (Cranium)
hips - Hüfte (Coxa)
oberarmlinks - Linker Oberarm (Humerus sinistrum)
unterarmlinks - Linker Unterarm (Antebrachium sinistrum)
handlinks - Linke Hand (Manus sinistra)
oberarmrechts - Rechter Oberarm (Humerus dextrum)
unterarmrechts - Rechter Unterarm (Antebrachium dextrum)
handrechts - Rechte Hand (Manus dextra)
ripcage - Brustkorb (Thorax)
oberschenkelleft - Linker Oberschenkel (Femur sinistrum)
unterschenkelleft - Linker Unterschenkel (Crus sinistrum)
knieleft - Linkes Knie (Genu sinistrum)
fussleft - Linker Fuß (Pes sinister)
oberschenkelright - Rechter Oberschenkel (Femur dextrum)
unterschenkelright - Rechter Unterschenkel (Crus dextrum)
knieright - Rechtes Knie (Genu dextrum)
fussright - Rechter Fuß (Pes dexter)

Eine Mapping Tabelle erstellen und dann die Namen zuordnen. 