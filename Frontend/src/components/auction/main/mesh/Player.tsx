import React, {} from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, useFrame } from 'react-three-fiber'

interface PlayerProps{
    moving: boolean,
    sitting: boolean,
    clickPosition: THREE.Vector3
}

const Player:React.FC<PlayerProps> = ({moving, sitting, clickPosition}) => {
    const glb = useLoader(GLTFLoader, '/auction/model/arh.glb') // 나중에 선택해서 가져오는 코드로 바꾸기
    const player = glb.scene.children[0]

    const mixer = new THREE.AnimationMixer(player);
    const normal = mixer.clipAction(glb.animations[0])
    const handsup = mixer.clipAction(glb.animations[1])
    const sitdown = mixer.clipAction(glb.animations[2])
    const standup = mixer.clipAction(glb.animations[3])
    const walk = mixer.clipAction(glb.animations[4])
    normal.stop()
    handsup.stop()
    sitdown.stop()
    standup.stop()
    walk.stop()
    normal.play()
    
    
    // useFrame(()=>{
    //     if (!moving && !sitting){
    //     }
    // })

    return(
        <primitive object={glb.scene}/>
    )
}

export default Player