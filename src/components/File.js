import React, {Suspense} from 'react';
import {Await, useAsyncError, useLoaderData} from "react-router-dom";

function ErrorFile() {
    let error = useAsyncError();

    return (
        <div>{error.message}</div>
    );
}

const File = () => {
    let {file} = useLoaderData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={file} errorElement={<ErrorFile/>}>
                {
                    file => FilePage(file)
                }
            </Await>
        </Suspense>
    );
};

function FilePage(file) {
    if (file == null) {
        return <div>Not found</div>
    }

    if (file instanceof Blob) {
        let url = URL.createObjectURL(file);

        if (file.type.startsWith('image') === false) {
            let a = document.createElement('a');
            a.href = url;
            a.download = file.name;
            a.click();

            return <div>Loading...</div>;
        }

        return <img src={url} alt={file.name}/>
    }


    return <div id="file">
        <div>File: {file.title}</div>
        <div>For user:</div>
        <img src={file.vkUser.photo} alt="avatar"/>
        <div>{file.vkUser.firstName} {file.vkUser.lastName}</div>
    </div>
}

File.loader = async (params) => {
    let infoResponse = await fetch(process.env.REACT_APP_API_URL + `/file/${params.id}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    if (infoResponse.ok === false) {
        return null;
    }

    let info = await infoResponse.json();

    let fileResponse = await fetch(process.env.REACT_APP_API_URL + `/file/${params.id}/download`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
            },
        }
    );

    if (fileResponse.ok) {
        let file = await fileResponse.blob();
        file.name = info.title;
        return file;
    }

    return info;
};

export default File;