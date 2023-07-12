import React, { Fragment, useState, useEffect } from "react";

const MediaUpload = (props) => {

    const [media, setMedia] = useState('')
    const [mediaName, setMediaName] = useState('Choose File')

    useEffect(()=>{
      console.log({media,mediaName})
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
            const response = await fetch("/uploads", {
                method: "POST",
                body: formData
            });
    
            if (response.ok) {
                console.log("Upload successful");
                var result = await response.json();
                console.log("Server response: ", result); 
                let fileUrl = 'http://localhost:3001' + result.filePath;
                props.findMediaPath(result);
                props.onMediaSelected(fileUrl);
                console.log("File URL: ", fileUrl);
            } else {
                console.error("Upload unsuccessful");
            }
    
        } catch (error) {
            console.log("MediaUpload error caught");
            console.log(error);
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

      </form>
    </>
  );
};

export default MediaUpload;


















