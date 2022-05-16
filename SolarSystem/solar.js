////////////////////////////////////////////////////////////////////////////////
// Project 4:  Solar System
////////////////////////////////////////////////////////////////////////////////


var effectController;
var saturnRingMesh, jupiterRingMesh, uranusRingMesh, neptuneRingMesh;
var sunMesh, mercuryMesh, venusMesh, earthMesh,
    marsMesh, jupiterMesh, saturnMesh, neptuneMesh, uranusMesh, plutoMesh;
// create the scene, renderer, and camera
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);


TW.mainInit(renderer, scene);

TW.cameraSetup(renderer, scene,
    {
        minx: -10000, maxx: 20000,
        miny: -10000, maxy: 20000,
        minz: -10000, maxz: 0
    });


//adds light 
scene.add(new THREE.AmbientLight(0xffffff));


//Add background
var path = "../textures/galaxy.jpeg";
var urls = [path, path,
    path, path,
    path, path];

var textureCube = THREE.ImageUtils.loadTextureCube(urls);
textureCube.format = THREE.RGBFormat;
var shader = THREE.ShaderLib.cube;
shader.uniforms.tCube.value = textureCube;

var backgroundMaterial = new THREE.ShaderMaterial({
    fragmentShader: shader.fragmentShader,
    vertexShader: shader.vertexShader,
    uniforms: shader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
});

var background = new THREE.Mesh(new THREE.CubeGeometry(50000, 50000, 50000), backgroundMaterial);
scene.add(background);


// adds texture coordinates to all the barn vertices

function makeSystem(textures) {
    //make sun 
    var sunGeom = new THREE.SphereGeometry(1200, 32, 32);
    textures.wrapS = THREE.RepeatWrapping;
    textures.wrapT = THREE.MirroredRepeatWrapping;
    var sunMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[0] })
    );
    TW.setMaterialForFaces(sunGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // end faces
    textures.flipY = false;
    sunMesh = new THREE.Mesh(sunGeom, sunMaterials);
    scene.add(sunMesh);

    //make sure the sun always in the center of screen 
    window.addEventListener(
        "resize",
        () => {

        }
    )
    //make mercury
    var mercuryGeom = new THREE.SphereGeometry(150, 32, 16);
    var mercuryMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[1] })
    );

    TW.setMaterialForFaces(mercuryGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // end faces

    mercuryMesh = new THREE.Mesh(mercuryGeom, mercuryMaterials);
    scene.add(mercuryMesh);
    mercuryMesh.position.set(2000, 0, 0);
    // mercury orbit 
    var mercuryOrbit = new THREE.RingGeometry(1975.0, 2000.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var mercuryOrbitMesh = new THREE.Mesh(mercuryOrbit, material);
    scene.add(mercuryOrbitMesh);

    //make venus
    var venusGeom = new THREE.SphereGeometry(300, 64, 16);
    var venusMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[2] })
    );

    TW.setMaterialForFaces(venusGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // end faces

    venusMesh = new THREE.Mesh(venusGeom, venusMaterials);
    scene.add(venusMesh);
    venusMesh.position.set(3000, 0, 0);
    //venus orbit 
    var venusOrbit = new THREE.RingGeometry(2975.0, 3000.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var venusOrbitMesh = new THREE.Mesh(venusOrbit, material);
    scene.add(venusOrbitMesh);

    //make earth 
    var earthGeom = new THREE.SphereGeometry(300, 64, 16);
    var earthMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[3] })
    );

    TW.setMaterialForFaces(earthGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // end faces

    earthMesh = new THREE.Mesh(earthGeom, earthMaterials);
    scene.add(earthMesh);
    earthMesh.position.set(4000, 0, 0);


    var earthOrbit = new THREE.RingGeometry(3975.0, 4000.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var earthOrbitMesh = new THREE.Mesh(earthOrbit, material);
    scene.add(earthOrbitMesh);

    //make mars
    var marsGeom = new THREE.SphereGeometry(200, 43, 16);
    var marsMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[4] })
    );

    TW.setMaterialForFaces(marsGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // end faces

    marsMesh = new THREE.Mesh(marsGeom, marsMaterials);
    scene.add(marsMesh);
    marsMesh.position.set(5000, 0, 0);
    // mars orbit
    var marsOrbit = new THREE.RingGeometry(4975.0, 5000.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var marsOrbitMesh = new THREE.Mesh(marsOrbit, material);
    scene.add(marsOrbitMesh);

    //make jupiter
    var jupiterGeom = new THREE.SphereGeometry(450, 96, 16);
    var jupiterMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[5] })
    );

    TW.setMaterialForFaces(jupiterGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // end faces

    jupiterMesh = new THREE.Mesh(jupiterGeom, jupiterMaterials);
    scene.add(jupiterMesh);
    jupiterMesh.position.set(-6000, -2000, 0);
    // jupiter orbit
    var jupiterOrbit = new THREE.RingGeometry(6300.0, 6324.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var jupiterOrbitMesh = new THREE.Mesh(jupiterOrbit, material);
    scene.add(jupiterOrbitMesh);
    // jupiter ring
    var jupiterRing = new THREE.RingGeometry(600, 650, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    jupiterRingMesh = new THREE.Mesh(jupiterRing, material);
    scene.add(jupiterRingMesh);
    // jupiterRingMesh.rotation.y = Math.Pi / 4;
    jupiterRingMesh.position.set(-6000, -2000, 0);


    //make saturn
    var saturnGeom = new THREE.SphereGeometry(300, 64, 16);
    var saturnMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[6] })
    );

    TW.setMaterialForFaces(saturnGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]); // end faces

    saturnMesh = new THREE.Mesh(saturnGeom, saturnMaterials);
    scene.add(saturnMesh);
    saturnMesh.position.set(-7000, -1000, 0)
    // saturn orbit
    var saturnOrbit = new THREE.RingGeometry(7046.0, 7071.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var saturnOrbitMesh = new THREE.Mesh(saturnOrbit, material);
    scene.add(saturnOrbitMesh);
    // saturn ring
    var saturnRing = new THREE.RingGeometry(400, 450, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    saturnRingMesh = new THREE.Mesh(saturnRing, material);
    scene.add(saturnRingMesh);
    saturnRingMesh.position.set(-7000, -1000, 0);

    //make uranus
    var uranusGeom = new THREE.SphereGeometry(450, 96, 16);
    var uranusMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[7] })
    );
    TW.setMaterialForFaces(uranusGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    uranusMesh = new THREE.Mesh(uranusGeom, uranusMaterials);
    scene.add(uranusMesh);
    uranusMesh.position.set(8000, 500, 0);
    // uranus orbit
    var uranusOrbit = new THREE.RingGeometry(7990.0, 8015.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var uranusOrbitMesh = new THREE.Mesh(uranusOrbit, material);
    scene.add(uranusOrbitMesh);
    // uranus ring
    var uranusRing = new THREE.RingGeometry(600, 650, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    uranusRingMesh = new THREE.Mesh(uranusRing, material);
    scene.add(uranusRingMesh);
    uranusRingMesh.position.set(8000, 500, 0);

    //make neptune
    var neptuneGeom = new THREE.SphereGeometry(300, 64, 16);
    var neptuneMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[8] })
    );
    TW.setMaterialForFaces(neptuneGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    neptuneMesh = new THREE.Mesh(neptuneGeom, neptuneMaterials);
    scene.add(neptuneMesh);
    neptuneMesh.position.set(-9000, 2000, 0);
    // neptune orbit
    var neptuneOrbit = new THREE.RingGeometry(9194.0, 9219.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var neptuneOrbitMesh = new THREE.Mesh(neptuneOrbit, material);
    scene.add(neptuneOrbitMesh);
    // neptune ring
    var neptuneRing = new THREE.RingGeometry(450, 500, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    neptuneRingMesh = new THREE.Mesh(neptuneRing, material);
    scene.add(neptuneRingMesh);
    neptuneRingMesh.position.set(-9000, 2000, 0);


    //make pluto
    var plutoGeom = new THREE.SphereGeometry(300, 64, 16);
    var plutoMaterials = new THREE.MeshFaceMaterial(
        new THREE.MeshPhongMaterial({ color: 0xffffff, map: textures[9] })
    );
    TW.setMaterialForFaces(plutoGeom, 0, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    plutoMesh = new THREE.Mesh(plutoGeom, plutoMaterials);
    scene.add(plutoMesh);
    plutoMesh.position.set(-10000, 2000, 0);
    // pluto orbit
    var plutoOrbit = new THREE.RingGeometry(10084.0, 10111.0, 256);
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    var plutoOrbitMesh = new THREE.Mesh(plutoOrbit, material);
    scene.add(plutoOrbitMesh);
}


TW.loadTextures(["../textures/sun.jpeg", "../textures/mercury.jpeg", "../textures/venus.jpeg",
    "../textures/earth.jpeg", "../textures/mars.webp", "../textures/jupitor.jpeg", "../textures/saturn.jpeg",
    "../textures/uranus.png", "../textures/neptune.jpeg", "../textures/pluto.jpeg"],
    function (textures) {
        makeSystem(textures);
    });

// create the GUI
effectController = {
    fps: 6.0,
    speed: 30,
    animation: "step"
};
function setupGui() {

    var gui = new dat.GUI();

    gui.add(effectController, "fps", 1.0, 60.0).step(1.0);
    gui.add(effectController, "speed", 1.0, 240.0).step(1.0);

}

function animate() {

    //this code is too slow when tested 
    // for (var i = 1; i <= 365; i++) {
    //     var EarthYear = 2 * Math.PI / 365 * i;
    //     window.requestAnimationFrame(animate);
    //     earthMesh.position.y += EarthYear;
    //     mercuryMesh.position.x = 2000 * Math.sin(EarthYear* 365 / 88);
    //     mercuryMesh.position.y = 2000 * Math.cos(EarthYear* 365 / 88) ;
    //     venusMesh.position.x = 3000 * Math.sin(EarthYear* 365 / 255);
    //     venusMesh.position.y = 3000 * Math.cos(EarthYear* 365 / 255) ;
    //     earthMesh.position.x = 4000 * Math.sin(EarthYear);
    //     earthMesh.position.y = 4000 * Math.cos(EarthYear);
    //     marsMesh.position.x = 5000 * Math.sin(EarthYear* 365 / 687);
    //     marsMesh.position.x = 5000 * Math.cos(EarthYear* 365 / 687) ;
    //     jupiterMesh.position.x = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.sin(EarthYear/ 12) ;
    //     jupiterMesh.position.y = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.cos(EarthYear/ 12) ;
    //     jupiterRingMesh.position.x = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.sin(EarthYear/ 12);
    //     jupiterRingMesh.position.y = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.cos(EarthYear/ 12) ;
    //     saturnMesh.position.x = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.sin(EarthYear/ 29) ;
    //     saturnMesh.position.y = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.cos(EarthYear/ 29) ;
    //     saturnRingMesh.position.x = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.sin(EarthYear/ 29) ;
    //     saturnRingMesh.position.y = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.cos(EarthYear/ 29) ;
    //     uranusMesh.position.x = Math.sqrt(8000 * 8000 + 500 * 500) * Math.sin(EarthYear/ 84) ;
    //     uranusMesh.position.y = Math.sqrt(8000 * 8000 + 500 * 500) * Math.cos(EarthYear/ 84) ;
    //     uranusRingMesh.position.x = Math.sqrt(8000 * 8000 + 500 * 500) * Math.sin(EarthYear/ 84) ;
    //     uranusRingMesh.position.y = Math.sqrt(8000 * 8000 + 500 * 500) * Math.cos(EarthYear/ 84) ;
    //     neptuneMesh.position.x = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.sin(EarthYear/ 165);
    //     neptuneMesh.position.y = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.cos(EarthYear/ 165);
    //     neptuneRingMesh.position.x = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.sin(EarthYear/ 165) / 165;
    //     neptuneRingMesh.position.y = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.cos(EarthYear/ 165) ;
    //     plutoMesh.position.x = Math.sqrt(10000 * 10000 + 2000 * 2000) * Math.sin(EarthYear/ 248) ;
    //     plutoMesh.position.y = Math.sqrt(10000 * 10000 + 2000 * 2000) * Math.cos(EarthYear/ 248) ;

    //     TW.render();
    // }
    var EarthYear = 2 * Math.PI;
    window.requestAnimationFrame(animate);
    earthMesh.position.y += EarthYear;
    mercuryMesh.position.x = 2000 * Math.sin(EarthYear * 365 / 88);
    mercuryMesh.position.y = 2000 * Math.cos(EarthYear * 365 / 88);
    venusMesh.position.x = 3000 * Math.sin(EarthYear * 365 / 255);
    venusMesh.position.y = 3000 * Math.cos(EarthYear * 365 / 255);
    earthMesh.position.x = 4000 * Math.sin(EarthYear);
    earthMesh.position.y = 4000 * Math.cos(EarthYear);
    marsMesh.position.x = 5000 * Math.sin(EarthYear * 365 / 687);
    marsMesh.position.x = 5000 * Math.cos(EarthYear * 365 / 687);
    jupiterMesh.position.x = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.sin(EarthYear / 12);
    jupiterMesh.position.y = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.cos(EarthYear / 12);
    jupiterRingMesh.position.x = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.sin(EarthYear / 12);
    jupiterRingMesh.position.y = Math.sqrt(6000 * 6000 + 2000 * 2000) * Math.cos(EarthYear / 12);
    saturnMesh.position.x = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.sin(EarthYear / 29);
    saturnMesh.position.y = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.cos(EarthYear / 29);
    saturnRingMesh.position.x = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.sin(EarthYear / 29);
    saturnRingMesh.position.y = Math.sqrt(7000 * 7000 + 1000 * 1000) * Math.cos(EarthYear / 29);
    uranusMesh.position.x = Math.sqrt(8000 * 8000 + 500 * 500) * Math.sin(EarthYear / 84);
    uranusMesh.position.y = Math.sqrt(8000 * 8000 + 500 * 500) * Math.cos(EarthYear / 84);
    uranusRingMesh.position.x = Math.sqrt(8000 * 8000 + 500 * 500) * Math.sin(EarthYear / 84);
    uranusRingMesh.position.y = Math.sqrt(8000 * 8000 + 500 * 500) * Math.cos(EarthYear / 84);
    neptuneMesh.position.x = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.sin(EarthYear / 165);
    neptuneMesh.position.y = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.cos(EarthYear / 165);
    neptuneRingMesh.position.x = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.sin(EarthYear / 165);
    neptuneRingMesh.position.y = Math.sqrt(9000 * 9000 + 2000 * 2000) * Math.cos(EarthYear / 165);
    plutoMesh.position.x = Math.sqrt(10000 * 10000 + 2000 * 2000) * Math.sin(EarthYear / 248);
    plutoMesh.position.y = Math.sqrt(10000 * 10000 + 2000 * 2000) * Math.cos(EarthYear / 248);

    TW.render();

}

// draw the scene for the first time
setupGui();
animate();
TW.render();
// renderer.render()


// const axesHelper = new THREE.AxesHelper(5000);
// scene.add(axesHelper);