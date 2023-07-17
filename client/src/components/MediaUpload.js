import React, { Fragment, useState, useEffect } from "react";

const MediaUpload = (props) => {

    const [media, setMedia] = useState('')
    const [mediaName, setMediaName] = useState('Choose File')

    useEffect(()=>{
      console.log({media,mediaName})
      //debugger;
    }, [media, mediaName])

    const handleMedia = (e) => {
        const selectedMedia = e.target.files[0];
        setMedia(selectedMedia)
        setMediaName(selectedMedia.name)
        handleSubmit(selectedMedia);
    }
    
    const handleSubmit = async (mediaFile) => {
        const formData = new FormData();
        formData.append('media', mediaFile);
    
        try {
            const response = await fetch("https://jamvault-3a4f37943c6d.herokuapp.com/uploads", {
                method: "POST",
                body: formData
            });
    
            if (response.ok) {
                console.log("Upload was successful");
                var result = await response.json();
                console.log("Server response: ", result); // Log the entire result object
                let fileUrl = result.filePath;
                props.findMediaPath(result);
                props.onMediaSelected(fileUrl);
                console.log("File URL: ", fileUrl);
            } else {
                console.error("Upload was unsuccessful");
            }
    
        } catch (error) {
            console.log("MediaUpload error caught");
            console.log(error);
        }
    }

  return (
    <>
      <form onSubmit={(event)=> { handleSubmit() }}>
        <div className="custom-file mb-4">
          <input type="file" className="custom-file-input" id="customFile" onChange={handleMedia} />
          <label className="custom-file-label" htmlFor="customFile">
            {mediaName} 
          </label>
        </div>

        {/*<button type='submit' className='btn btn-primary btn-block mt-4'> Upload</button>*/}
      </form>
    </>
  );
};

export default MediaUpload;


















