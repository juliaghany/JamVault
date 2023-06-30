import React, { Fragment, useState } from "react";
import axios from 'axios'

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

            const res = await axios.post('/uploads', formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });

            const {  fileName, filePath } = res.data

            setUploadedMedia({  fileName, filePath} )

        } catch(err) {
            if(err.response.status === 500) {
                console.log('Problem with the server')
            } else {
                console.log(err.response.data)
            }
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













