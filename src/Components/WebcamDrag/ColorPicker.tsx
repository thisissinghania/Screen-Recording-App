import React, { FC, useState } from 'react'
import { Sketch } from '@uiw/react-color'

interface IProps {
  hex: string
  setHex(...args: unknown[]): unknown
}
const ColorPicker: FC<IProps> = ({ hex = '#a3d8e7', setHex }) => {
  // const [hex, setHex] = useState("#a3d8e7");
  const [showModal, setShowModal] = useState(false)

  return (
    <div className='stroke-color'>
      <div
        style={{
          backgroundColor: hex,
          borderRadius: '50%',
          border: 'none',
          display: 'inline-block',
          width: '18px',
          height: '18px',
          overflow: 'hidden'
        }}
        onClick={() => setShowModal(!showModal)}
      />

      {/* <button
        style={{
          backgroundColor: hex,
          borderRadius: '50%',
          border: 'none',
          display: 'inline-block',
          width: '24px',
          height: '24px',
          overflow: 'hidden'
        }}
        onClick={() => setShowModal(!showModal)}
      /> */}
      {showModal && (
        <div
          style={{
            top: 0,
            left: 0,
            width: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-120px',
              left: '140px',
              transform: 'translate(-50%, -50%)',
              background: '#fff',
              padding: '3px',
              borderRadius: '5px'
            }}
          >
            <div className='arrow' />
            <Sketch
              color={hex}
              onChange={color => {
                setHex(color.hex)
                setShowModal(false)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ColorPicker
