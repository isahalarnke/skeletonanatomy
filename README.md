# skeletonanatomy
Three JS application for Computer graphics module, skeleton anatomy learning tool

Quellensammlung:

- Three.js Dokumentation: https://threejs.org/docs/index.html#manual/en/introduction/Loading-3D-models 08.Juni 2024
- Creating text: https://threejs.org/docs/#manual/en/introduction/Creating-text 10.Juni 2024
- CSS diplay setting: https://www.w3schools.com/cssref/pr_class_display.php 12. Juni 2024
- CSS labels: https://www.htmlgoodies.com/css/css-labels-buttons-forms/ 12. Juni 2024
- Three JS Fontloader Tutorial: https://www.youtube.com/watch?v=l7K9AMnesJQ, SuboptimalEng Github: https://github.com/SuboptimalEng/three-js-tutorials 12, Juni 2024
- Raycaster und Mouse-Objekt Hovering/Intersection: https://threejs.org/docs/#api/en/core/Raycaster 03.Juni 2024


Aktuelle funktionale Anforderungen (über die Zeit hinweg anpassbar):
[x] Skelett lässt sich ranzommen und drehen mit Mouse Control --> TrackBallControl
[x/] Controlleiste mit Drehung evtl. Zoom ?
[x] Körperteil färbt sich wenn man hovered und Textfeld ploppt auf wie es heißt
[] 3D-Textgeometry Beschriftungen an mit Pfeilen an den Körperteilen
[] Beschriftung Button, der Beschriftung an und ausschaltet
[] evtl. eine Quiz-Funktion mit Uhr die abläuft oder das richtige Körperteil muss angezeigt werden
[] Button wo alle Körperteile in unterschiedlichen Farben erscheinen
[] Kamera und Lichteinstellung checken!

TODO:
- Ein gutes Modell finden (Skelett oder Arm, Bein) und in Blender importieren und Segmentieren (wie am besten zusammenführen? In Blender oder Three.js?? --> Erledigt
- Die einzelnen Körperteile müssen in einer Liste bzw. Map gespeichert werden (Name ist der Key zum Adressieren und den Labels)


- lateinische Fachbegriffe:
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

evtl einfach eine Mapping Tabelle erstellen und dann die Namen zuordnen.