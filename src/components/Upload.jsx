import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineReload } from "react-icons/ai";

const Upload = () => {
    let navigate = useNavigate();
    let [vkLink, setVkLink] = useState('');
    let [inputFile, setInputFile] = useState(null);
    let [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        if (!e.target.files.length) {
            setLoading(false);
        }
        setInputFile(e.target.files[0]);
    };

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
                    className={`uploadButton ${loading && 'loadingButton'}`}
                    disabled={inputFile == null || vkLink === ''}
                    onClick={async () => {
                        let file = inputFile;
                        if (file == null) {
                            return;
                        }

                        setLoading(true);

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

                        setLoading(false);

                        navigate(`/file/${fileRes.id}`);
                    }}>
                    {loading ? 'Загрузка...' : 'Upload'}
                </button>
            </div>

            <div className={`uploadBlock ${inputFile && 'active'} ${loading && 'loadingBlock'}`}
                onClick={() => document.getElementById('fileInput').click()}
            >
                {inputFile && <h1 lang="ru" className={`${inputFile && 'active'}`}>{inputFile.name}</h1>}
                {
                    loading ? <AiOutlineReload className={`uploadIcon loadingIcon`} /> :
                        <FaCloudUploadAlt className={`uploadIcon ${inputFile && 'active'}`} />
                }
                <h2 className={`uploadText ${inputFile && 'active'}`} > {loading ? 'Загрузка файла...' : 'Выберите файл'}</h2>
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