# skeletonanatomy
Three JS application for Computer graphics module, skeleton anatomy learning tool

**Quellensammlung:**

- Three.js Dokumentation: https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models 08.Juni 2024
- Creating text: https://threejs.org/docs/#manual/en/introduction/Creating-text 10.Juni 2024
- CSS diplay setting: https://www.w3schools.com/cssref/pr_class_display.php 12. Juni 2024
- CSS labels: https://www.htmlgoodies.com/css/css-labels-buttons-forms/ 12. Juni 2024
- Three JS Fontloader Tutorial: https://www.youtube.com/watch?v=l7K9AMnesJQ, SuboptimalEng Github: https://github.com/SuboptimalEng/three-js-tutorials 12, Juni 2024
- Raycaster und Mouse-Objekt Hovering/Intersection: https://threejs.org/docs/#api/en/core/Raycaster 03.Juni 2024
- 


**Aktuelle funktionale Anforderungen:**
[x] Skelett lässt sich ranzommen und drehen mit Mouse Control --> TrackBallControl
[x] Controlleiste mit Drehung
[x] Körperteil färbt sich, wenn man hovered und Textfeld ploppt auf mit dem lateinischen Namen
[x] 3D-Textgeometry Beschriftungen
[x] Beschriftung Button, der Beschriftung an und ausschaltet
[x] eine Quiz-Funktion gestartet durch Quiz-Button (Stop Funktion)
[x] Fragen und Antwort dadurch, wenn richtiges Körperteil angeklickt wird
[x] Score Zähler im Hintergrund, der bei richtiger Antwort hochzählt
[x] Bei falscher Antwort wird das ursprünglich richtige Körperteil blau angefärbt
[x] bei erfolgreicher Leistung Party Time mit Confetti Partikelsystem

**Vorgehensweise:**
- Modell in Blender importieren und die Körperteile einzeln ausschneiden und wieder in die Szene laden (Gltf Loader)
- Schriftarten laden (FontLoader)
- Funktionalitäten implementieren


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