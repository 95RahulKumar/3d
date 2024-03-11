import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export interface RGB {
  isColor: boolean;
  r: number;
  g: number;
  b: number;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Three';
  meshMaterial: any;
  ngOnInit(): void {
    this.render3D();
  }

  async render3D() {
    const ele = document.querySelector('#canvas');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    //
    const loader = new GLTFLoader();

    const gltf = await loader.loadAsync('assets/image/shoe.gltf');
    console.log('gltf model....', gltf);
    gltf.scene.scale.set(1, 1, 1);
    // this.settingColorForGLTF(gltf)
    const meshChild: any = gltf.scene.children[0].children;
    this.meshMaterial = meshChild;
    // meshChild.forEach((child: any) => {
    //   const { material } = child as any;
    //   // material.color = this.hexToRgb('#f1f1f1');
    //   if (material.name == 'laces') {
    //     material.color = this.hexToRgb('#00ff00');
    //   }
    //   if (material.name == 'mesh') {
    //     //body
    //     material.color = this.hexToRgb('#FF0000');
    //   }

    //   console.log(material.name);
    // });
    // console.log(glbMesh); // glbMesh.material.color = 'rgba(255,255,255)';

    scene.add(gltf.scene);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    ele?.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
    const ambiantLight = new THREE.AmbientLight(0xffffff, 1);
    pointLight.position.set(0, 1, 1);
    pointLight1.position.set(0, 1, -1);
    scene.add(pointLight);
    scene.add(pointLight1);
    const sphereSize = 0.1;
    const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    const pointLightHelper1 = new THREE.PointLightHelper(
      pointLight1,
      sphereSize
    );
    scene.add(pointLightHelper);
    scene.add(pointLightHelper1);
    scene.add(ambiantLight);
    // scene.add(pointLightHelper);
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0xff0000,
      opacity: 1,
    });
    const cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);

    camera.position.z = 2;
    controls.update();
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();

      // cube.rotation.x += 0.01;
      // cube.rotation.y += 0.01;
    }

    animate();
    console.log(ele);
  }

  hexToRgb(hex: string): { isColor: boolean; r: number; g: number; b: number } {
    // Remove the hash if it exists
    hex = hex.replace(/^#/, '');

    // Parse the hex color to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    // Check if the parsing was successful
    const isColor = !isNaN(r) && !isNaN(g) && !isNaN(b);

    return {
      isColor,
      r: isColor ? r / 255 : 0, // Normalize to a range between 0 and 1
      g: isColor ? g / 255 : 0,
      b: isColor ? b / 255 : 0,
    };
  }

  ChangeCol() {
    this.meshMaterial.forEach((child: any) => {
      const { material } = child as any;
      // material.color = this.hexToRgb('#f1f1f1');
      if (material.name == 'laces') {
        material.color = this.hexToRgb('#00ff00');
      }
      if (material.name == 'mesh') {
        //body
        material.color = this.hexToRgb('#FFff00');
      }
      if (material.name == 'inner') {
        //body
        material.color = this.hexToRgb('#00ff00');
      }
      if (material.name == 'stripes') {
        //body
        material.color = this.hexToRgb('#0000ff');
      }
      if (material.name == 'patch') {
        //body
        material.color = this.hexToRgb('#0000ff');
      }
      console.log(material.name);
    });
  }
}
