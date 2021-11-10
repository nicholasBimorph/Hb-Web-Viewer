import * as THREE from 'https://unpkg.com/three/build/three.module.js'

import { OrbitControls } from 'https://cdn.skypack.dev/three@0.128.0/examples/jsm/controls/OrbitControls.js'


let scene, camera, renderer, geometry, controls, material;

export class ViewerStartup {

    
    constructor() {
    }

    startUp() {

        scene = new THREE.Scene();

        scene.background = new THREE.Color(0xcccccc);

        const grid = new THREE.GridHelper(100, 20, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);

        this.initCamara();

        this.initRenderer();

        this.initControls();

        this.initLights();

        this.addSceneGeometry(scene);

    }

    initCamara() {

        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        camera.position.set(0, 20, 50)

        camera.lookAt(0, 0, 0);

        scene.add(camera)

    }

    addSceneGeometry() {

        const geoObject = new THREE.TorusKnotGeometry(10, 3, 100, 16);

        const material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            flatShading: true,
            shininess: 0
        });

        const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true, transparent: true });

        geometry = new THREE.Mesh(geoObject, material);

        let wireframe = new THREE.Mesh(geoObject, wireframeMaterial);

        geometry.add(wireframe);

        scene.add(geometry);
    }


    animation() {

        requestAnimationFrame(animation);

        geometry.rotation.x += 0.01;

        geometry.rotation.y += 0.01

        renderer.render(scene, camera);


    }

    initRenderer() {

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(0xffffff, 0);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

    }

    initControls() {

        controls = new OrbitControls(camera, renderer.domElement)
        controls.enablePan = true;
        controls.enableZoom = true;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;

    }

    initLights() {


        const dirLight1 = new THREE.DirectionalLight(0xffddcc, 1);
        dirLight1.position.set(1, 0.75, 0.5);
        scene.add(dirLight1);

        const dirLight2 = new THREE.DirectionalLight(0xccccff, 1.1);
        dirLight2.position.set(- 1, 0.75, - 0.5);
        scene.add(dirLight2);

        const ambientLight = new THREE.AmbientLight(0x222222);
        scene.add(ambientLight);

    }

}