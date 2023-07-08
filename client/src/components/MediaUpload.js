import React, { Fragment, useState } from "react";

const MediaUpload = () => {

    const [media, setMedia] = useState('')
    const [mediaName, setMediaName] = useState('Choose File')
    const [uploadedMedia, setUploadedMedia] = useState({})

    const handleMedia = (e) => {
        setMedia(e.target.files[0])
        setMediaName(e.target.files[0].name)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
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
          console.log(error)
        }

    }

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={handleMedia} />
          <label className="custom-file-label" htmlFor="customFile">
            {mediaName} 
          </label>
        </div>

        <button type='submit' className='btn btn-primary btn-block mt-4'> Upload</button>
      </form>
    </Fragment>
  );
};

export default MediaUpload;


















