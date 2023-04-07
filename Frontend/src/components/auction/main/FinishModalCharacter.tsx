import React,{useRef, useMemo} from "react"

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader, useFrame } from "react-three-fiber";
import { useSelector } from "react-redux";
import { biddingHistory } from "store/auction";
import { RootState } from "store/configStore";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

type action = {
    buy: THREE.AnimationAction | null;
    notbuy: THREE.AnimationAction | null;
  };

const FinishModalCharacter:React.FC = () => {
    const biddingHistory = useSelector<RootState, biddingHistory[]>(
        (state) => state.auction.auctionInfo.biddingHistory
      );
  
  const glb = useLoader(GLTFLoader, "/auction/model/character.glb");
  const actions = useRef<action>({
    buy: null,
    notbuy: null,
  });
  const character = useMemo(()=>{
    return clone(glb.scene)
  },[glb.scene])
  
  const player = character.children[0];
  player.position.set(0,0,0)
  player.rotation.set(0,0,0)
  character.traverse((child) => {
    if (child.isObject3D) {
      child.castShadow = true;
    }
  });

  const mixer = new THREE.AnimationMixer(character.children[0]);

  for (let i = 0; i < glb.animations.length; i++) {
    const action = mixer.clipAction(glb.animations[i]);
    const name = action.getClip().name;

    if (name === "buy") {
      actions.current.buy = action;
    }
    if (name === "notbuy") {
      action.repetitions = 1;
      action.clampWhenFinished = true;
      actions.current.notbuy = action;
    }
  }
  useFrame((state,delta) => {
    mixer.update(delta);
    if(JSON.parse(sessionStorage.getItem('user')!).nickname === biddingHistory[0].nickname){
      actions.current.buy?.play()
    } else{
      actions.current.notbuy?.play()
    }
  })
    return <primitive object={character} />
}

export default FinishModalCharacter