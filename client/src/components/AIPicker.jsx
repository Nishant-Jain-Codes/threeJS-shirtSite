import React from 'react'
import CustomButtom from './CustomButton'

const AIPicker = ({prompt , setPrompt , generatingImg,handleSubmit}) => {

  return (
    <div className='aipicker-container'>
      <textarea
      className='aipicker-textarea'
      placeholder='Enter a prompt for the AI to generate an image'
      rows={5}
      value={prompt}
      onChange = {(e) => setPrompt(e.target.value)}
      />
      <div className='flex flex-wrap gap-3'>
        {generatingImg ? (
          <CustomButtom
          type="outline"
          title="Asking AI..."
          customStyles="text-xs"
          />
        ):(
          <>
          <CustomButtom
          type="outline"
          title="AI logo"
          handleClick={()=>handleSubmit('logo')}
          customStyles="text-xs"
          />
          <CustomButtom
          type="filled"
          title="AI FULL"
          handleClick={()=>handleSubmit('full')}
          customStyles="text-xs"
          />
          </>
        )}
      </div>
    </div>
  )
}

export default AIPicker