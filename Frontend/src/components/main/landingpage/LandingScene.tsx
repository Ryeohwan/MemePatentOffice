import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import gsap from "gsap";
import LandingPageBorder from "components/main/landingpage/LandingPageBorder";

import styles from "./LandingScene.module.css";
import LandingPanel from "./LandingPanel";

interface SceneProps {
  width: number;
  height: number;
}

const LandingScene: React.FC<SceneProps> = ({ width, height }) => {
  const imageRotation = useRef<THREE.Vector3[]>([]);
  const imagePanelsPosition = useRef<THREE.Vector3[]>([]);
  const imagePanels = useRef<THREE.Mesh[]>([]);
  const randomPositionArray = useRef<number[]>([]);

  const borderPosition = [
    [-5, -12, -10],
    [5, 0, 0],
    [5, 0, 0],
    [-5, 12, -10],
    [5, 24, -20],
    [-5, 36, -30],
  ];
  const currentSection = useRef(0);
  // const [panelState, setPanelState] = useState(false);
  const panelState = useRef(false);
  const camera = useRef<THREE.PerspectiveCamera>(
    new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  );
  camera.current.position.set(-5, -12, -5);
  // camera.current.position.set(0, 0, -2);

  const setSection = () => {
    // window.pageYOffset
    const newSection = Math.round(window.scrollY / window.innerHeight);
    console.log(newSection);
    if (currentSection.current !== newSection) {
      if (newSection === 2) {
        // setPanelState(true);
        panelState.current = true;
      }else{
        panelState.current = false;
      }
      gsap.to(camera.current.position, {
        duration: 1,
        x: borderPosition[newSection][0],
        y: borderPosition[newSection][1],
        z: borderPosition[newSection][2] + 5,
      });
      // setPanelState(false);

      currentSection.current = newSection;
    }
  };

  window.addEventListener("scroll", setSection);

  return (
    <div className={styles.canvas} id="landing-canvas">
      <Canvas
        color="#000000"
        dpr={window.devicePixelRatio > 1 ? 2 : 1}
        camera={camera.current}
      >
        <ambientLight />
        <LandingPageBorder borderPosition={borderPosition[0]} />
        <LandingPanel
          panelState={panelState}
          imageRotation={imageRotation}
          imagePanels={imagePanels}
          randomPositionArray={randomPositionArray}
          imagePanelsPosition={imagePanelsPosition}
        />
        <LandingPageBorder borderPosition={[5,-3,0]} />
        <LandingPageBorder borderPosition={borderPosition[3]} />
        <LandingPageBorder borderPosition={borderPosition[4]} />
        <LandingPageBorder borderPosition={borderPosition[5]} />
      </Canvas>
    </div>
  );
};

export default LandingScene;
