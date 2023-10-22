import React, {useRef, useState} from 'react';

const Upload = () => {
    let [vkLink, setVkLink] = useState('https://vk.com/energizet');
    let inputFileRef = useRef();

    return (
        <div id="upload">
            <input type="text" value={vkLink} onChange={e => setVkLink(e.target.value)}/>
            <input type="file" ref={inputFileRef}/>
            <button onClick={async () => {
                let [file] = inputFileRef.current.files;
                if (file == null) {
                    return;
                }

                let formData = new FormData();
                formData.append('file', file, file.name);
                let fileRes = await fetch(process.env.REACT_APP_API_URL + '/upload', {
                    method: "POST",
                    body: formData,
                }).then(d => d.json());

                let saveReq = {
                    id: fileRes.id,
                    title: file.name,
                    vkLink: vkLink,
                };
                let saveRes = await fetch(process.env.REACT_APP_API_URL + '/upload/save', {
                    method: 'POST',
                    body: JSON.stringify(saveReq),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(d => d.text());
                console.log(saveRes);

            }}>
                Upload
            </button>
        </div>
    );
};

export default Upload;