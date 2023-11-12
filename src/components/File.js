import React, {Suspense} from 'react';
import {Await, useAsyncError, useAsyncValue, useLoaderData, useRouteError} from "react-router-dom";

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
            a.download = file.type.replace('/', '.');
            a.click();

            return <div>Loading...</div>;
        }

        return <img src={url} alt="user photo"/>
    }


    return <div id="file">
        <div>File: {file.title}</div>
        <div>For user:</div>
        <img src={file.vkUser.photo} alt="avatar"/>
        <div>{file.vkUser.firstName} {file.vkUser.lastName}</div>
    </div>
}

File.loader = async (params) => {
    let file = await fetch(process.env.REACT_APP_API_URL + `/file/${params.id}/download`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
            },
        });

    if (file.ok) {
        return await file.blob();
    }

    let info = await fetch(process.env.REACT_APP_API_URL + `/file/${params.id}`,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    if (info.ok === false) {
        return null;
    }

    return await info.json();
};

export default File;