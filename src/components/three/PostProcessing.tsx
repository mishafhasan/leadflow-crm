// @ts-nocheck
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'

export default function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom intensity={0.6} radius={0.5} threshold={0.2} />
      <Vignette eskil={false} offset={0.1} darkness={0.5} />
    </EffectComposer>
  )
}
