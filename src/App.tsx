import React, { useState } from 'react'
import { DefaultXRControllers, ARCanvas, Interactive } from '@react-three/xr'
import { Text } from '@react-three/drei'
import './styles.css'

function Box({ color, size, scale, children, ...rest }: any) {
  return (
    <mesh scale={scale} {...rest}>
      <boxBufferGeometry attach="geometry" args={size} />
      <meshPhongMaterial attach="material" color={color} />
      {children}
    </mesh>
  )
}

function Button(props: any) {
  const [hover, setHover] = useState(false)
  const [color, setColor] = useState<any>('blue')
  const [text, setText] = useState('')

  const getTimeRemaining = (endtime: string) => {
    const total = Date.parse(endtime) - Date.now()
    let seconds = Math.floor((total / 1000) % 60).toString()
    let minutes = Math.floor((total / (1000 * 60)) % 60).toString()
    let hours = Math.floor((total / (1000 * 60 * 60)) % 24).toString()
    let days = Math.floor(total / (1000 * 60 * 60 * 24)).toString()

    seconds = seconds.length < 2 ? '0' + seconds : seconds
    minutes = minutes.length < 2 ? '0' + minutes : minutes
    hours = hours.length < 2 ? '0' + hours : hours

    return {
      total,
      days,
      hours,
      minutes,
      seconds
    }
  }

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0)
  }

  setInterval(() => {
    const t = getTimeRemaining('December 31 2023 23:59:59 GMT-0500')
    setText(`${t.days} days ${t.hours}:${t.minutes}:${t.seconds}`)
  }, 1000)

  return (
    <Interactive onHover={() => setHover(true)} onBlur={() => setHover(false)} onSelect={onSelect}>
      {/* <Box color="transparent" scale={hover ? [0.6, 0.6, 0.6] : [0.5, 0.5, 0.5]} size={[0.4, 0.1, 0.1]} {...props}>
        <Text position={[0, 0, 0.06]} fontSize={0.05} color={color} anchorX="center" anchorY="middle">
          {text}
        </Text>
      </Box> */}
      <Text position={[0, 0, 0.06]} fontSize={0.05} color={color} anchorX="center" anchorY="middle" scale={[2, 2, 2]} {...props}>
        {text}
      </Text>
    </Interactive>
  )
}

export function App() {
  return (
    <ARCanvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Button position={[0, 0.1, -0.2]} />
      {/* <Button position={[0, 0.1, 4]} /> */}
      <DefaultXRControllers />
    </ARCanvas>
  )
}
