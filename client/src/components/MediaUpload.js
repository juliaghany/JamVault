import React, { Fragment, useState } from "react";

const MediaUpload = () => {

    const [media, setMedia] = useState('')
    const [mediaName, setMediaName] = useState('Choose File')

    const handleMedia = (e) => {
        setMedia(e.target.files[0])
        setMediaName(e.target.files[0].name)
    }

    const handleSubmit = async () => {
        const formData = new FormData()
        formData.append('media', media)

        try {
          const response = await fetch("/uploads", {
            method:"POST",
            body: formData
          })

          if(response.ok) {
            console.log("successful")
          } else {
            console.error("unsuccessful")
          }


        } catch(error) {
          console.log("Ran here MediaUpload error caught")
          console.log(error)
        }

    }

  return (
    <>
      <form onSubmit={(event)=> { event.preventDefault(); handleSubmit() }}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={handleMedia} />
          <label className="custom-file-label" htmlFor="customFile">
            {mediaName} 
          </label>
        </div>

        <button type='submit' className='btn btn-primary btn-block mt-4'> Upload</button>
      </form>
    </>
  );
};

export default MediaUpload;


















