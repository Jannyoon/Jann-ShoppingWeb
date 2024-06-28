

export async function CloudinaryUpload(fileImg){
    const formData = new FormData();
    formData.append("file", fileImg);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);

    return fetch(process.env.REACT_APP_UPLOAD_URL, {
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(data =>{
        console.log("data는", data);
        return data.url
      })
      .catch(console.error);
}

