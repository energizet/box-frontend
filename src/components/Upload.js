import React, {useState} from 'react';

const Upload = () => {
    let [vkLink, setVkLink] = useState('https://vk.com/energizet');
    let [inputFile, setInputFile] = useState(null);

    return (
        <div id="upload">
            <input type="text" value={vkLink} onChange={e => setVkLink(e.target.value)}/>
            <input type="file" onChange={e => setInputFile(e.target.files[0])}/>
            <button onClick={async () => {
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
                console.log(saveRes);

            }}>
                Upload
            </button>
        </div>
    );
};

export default Upload;