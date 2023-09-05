import React , {useRef} from 'react'
import state from '../store'
import { useFrame } from '@react-three/fiber'
import { useSnapshot } from 'valtio'
import { easing } from 'maath'
const CameraRig = ({children}) => {
  const group = useRef();
  const snap = useSnapshot(state);

  useFrame((state , delta)=> {
    const isBreakpoint = window.innerwidth <= 1260;
    const isMobile = window.innerwidth <= 600;
    //set the initial position of the model
    let targetPosition = [-0.4,0,2];
    if(snap.intro){
      if(isBreakpoint)
        targetPosition = [0,0,2];
      if(isMobile)
        targetPosition = [0,0.2,2.5];
    }
    else{
      if(isMobile)
        targetPosition = [0,0.2,2.5];
      else 
        targetPosition = [0,0,2];
    }
    //set model camera position 
    easing.damp3(state.camera.position,targetPosition,0.25,delta)
    //set teh model rotation to the mouse position
    easing.dampE(
      group.current.rotation,
      [state.pointer.y/3,-state.pointer.x/3,0],
      0.25,
      delta
    )
  })
  return (
    <group ref={group}>
      {children}
    </group>
  )
}

export default CameraRig