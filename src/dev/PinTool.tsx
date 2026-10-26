import { useMemo, useState } from 'react'
import type { MouseEvent } from 'react'
import { worlds } from '../worlds'

interface Dot {
  id: string
  name: string
  x: number
  y: number
}

/**
 * Hidden authoring page at /pin-tool (or #pin-tool). Click a map to drop a pin,
 * name it, and copy the JSON into the world's data module.
 * Fantasy places have no real coordinates, so this is how they are placed.
 */
export function PinTool() {
  const [worldIndex, setWorldIndex] = useState(0)
  const [labelled, setLabelled] = useState(true)
  const [dots, setDots] = useState<Dot[]>([])
  const world = worlds[worldIndex]

  const json = useMemo(
    () =>
      dots
        .map((d) => `    { id: '${d.id}', name: ${JSON.stringify(d.name)}, x: ${d.x}, y: ${d.y} },`)
        .join('\n'),
    [dots],
  )

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = Number(((event.clientX - rect.left) / rect.width).toFixed(3))
    const y = Number(((event.clientY - rect.top) / rect.height).toFixed(3))
    const name = window.prompt('Name this place')?.trim()
    if (!name) return
    const id = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/\p{M}/gu, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
    setDots((current) => [...current, { id, name, x, y }])
  }

  return (
    <main className="pin-tool">
      <h1>Pin tool</h1>
      <p>Click the map to place a pin. Existing pins are shown in blue.</p>
      <div className="pin-tool__controls">
        <label>
          World{' '}
          <select
            value={worldIndex}
            onChange={(event) => {
              setWorldIndex(Number(event.target.value))
              setDots([])
            }}
          >
            {worlds.map((w, i) => (
              <option key={w.id} value={i}>
                {w.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          <input type="checkbox" checked={labelled} onChange={(event) => setLabelled(event.target.checked)} /> Show labelled map
        </label>
        <button type="button" onClick={() => setDots((current) => current.slice(0, -1))} disabled={!dots.length}>
          Undo
        </button>
      </div>
      <div className="pin-tool__map" onClick={onClick} style={{ aspectRatio: `${world.maps.width} / ${world.maps.height}` }}>
        <img src={labelled ? world.maps.labelled : world.maps.unlabelled} alt="" draggable={false} />
        {world.pins.map((p) => (
          <span key={p.id} className="pin-tool__dot pin-tool__dot--existing" style={{ left: `${p.x * 100}%`, top: `${p.y * 100}%` }} title={p.name} />
        ))}
        {dots.map((d) => (
          <span key={d.id} className="pin-tool__dot" style={{ left: `${d.x * 100}%`, top: `${d.y * 100}%` }} title={d.name} />
        ))}
      </div>
      <h2>Pins to paste</h2>
      <textarea readOnly rows={Math.max(4, dots.length + 1)} value={json} onFocus={(event) => event.target.select()} />
    </main>
  )
}
