import React, { useState } from "react";

const MediaUpload = ({ onMediaSelected }) => {

    const [media, setMedia] = useState('')
    const [mediaName, setMediaName] = useState('Choose File')

    const handleMedia = (e) => {
        const file = e.target.files[0];
        setMedia(file);
        setMediaName(file.name);
        onMediaSelected(file);
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
        <>
            <form onSubmit={handleSubmit}>
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