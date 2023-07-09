import React, { Fragment, useState, useEffect } from "react";

const MediaUpload = () => {

    const [media, setMedia] = useState('')
    const [mediaName, setMediaName] = useState('Choose File')

    useEffect(()=>{
      console.log({media,mediaName})
      //debugger;
    }, [media, mediaName])

    const handleMedia = (e) => {
        setMedia(e.target.files[0])
        setMediaName(e.target.files[0].name)
        //debugger;
        handleSubmit(e);
        //handleSubmit();
    }

    const handleSubmit = async (e) => {
        const formData = new FormData()
        //formData.append('media', media)
        formData.append('media', e.target.files[0])
        window.lastUploadingFile = e.target.files[0] //need to stop propogation 
//get the e.target in postform and check its files 
        try {
          const response = await fetch("/uploads", {
            method:"POST",
            body: formData
          })

          if(response.ok) {
            console.log("successful")
          } else {
            //debugger;
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

        {/*<button type='submit' className='btn btn-primary btn-block mt-4'> Upload</button>*/}
      </form>
    </>
  );
};

export default MediaUpload;


















