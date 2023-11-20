import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const Upload = () => {
    let navigate = useNavigate();
    let [vkLink, setVkLink] = useState('https://vk.com/byedie666');
    let [inputFile, setInputFile] = useState(null);
    const handleFileChange = (e) => {
        setInputFile(e.target.files[0])
    }


    return (
        <div id="upload">
            <div className="urlBlock">
                <input
                    className='urlInput'
                    placeholder='Вставьте url получатля'
                    type="text"
                    value={vkLink}
                    onChange={e => setVkLink(e.target.value)} />
                <button
                    className='uploadButton'
                    disabled={inputFile && vkLink ? false : true}
                    onClick={async () => {
                        let file = inputFile;
                        if (file == null) {
                            return;
                        }

                        let formData = new FormData();
                        formData.append('file', file, file.name);
                        let fileRes = await fetch(process.env.REACT_APP_API_URL + '/file/upload', {
                            method: "POST",
                            body: formData,
                        }).then(d => d.json());

                        let saveReq = {
                            id: fileRes.id,
                            title: file.name,
                            vkLink: vkLink,
                        };
                        let saveRes = await fetch(process.env.REACT_APP_API_URL + '/file/save', {
                            method: 'POST',
                            body: JSON.stringify(saveReq),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }).then(d => d.json());

                        navigate(`/file/${fileRes.id}`);
                    }}>
                    Upload
                </button>
            </div>

            <div className={`uploadBlock ${inputFile&&'active'}`} onClick={() => document.getElementById('fileInput').click()}>
                {inputFile && <h1 className={`${inputFile&&'active'}`}>{inputFile.name}</h1>}
                <FaCloudUploadAlt className={`uploadIcon ${inputFile&&'active'}`} />
                <h2 className={`uploadText ${inputFile&&'active'}`} >Выберите файл</h2>
                <input
                    id="fileInput"
                    type="file"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
            </div>
        </div>
    );
};

export default Upload;