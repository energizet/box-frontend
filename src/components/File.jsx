import React, { Suspense } from 'react';
import { Await, useAsyncError, useLoaderData } from "react-router-dom";

function Error() {
    let error = useAsyncError();

    return (
        <div>{error.message}</div>
    );
}

const File = () => {
    let { file } = useLoaderData();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={file} errorElement={<Error />}>
                {
                    file => FilePage(file)
                }
            </Await>
        </Suspense>
    );
};

function FilePage(file) {
    const fileDownloader = () => {
        let a = document.createElement('a');
        a.download = file.title;
        a.click()
    }


    if (file == null) {
        return <div>Not found</div>
    }

    if (file instanceof Blob) {
        let url = URL.createObjectURL(file);

        if (file.type.startsWith('image') === false) {

            function down() {
                console.log()
                let a = document.createElement('a');
                a.href = url;
                a.download = file.name;
                a.click()
            }

            return <div className='downloadBlock wrappBlocks'>
                <h2>{file.name}</h2>
                <button onClick={down}>Скачать</button>
                <h3>
                    {parseInt(file.size / 1024) > 0 ? `${parseInt(file.size / 1024)} Кб` :
                        `${parseInt(file.size / (1024 * 1024))} Мб`}
                </h3>
            </div>;
        }

        return <div className="wrappBlocks">
            <img src={url} alt={file.name} />
        </div>
    }


    return <div id="file" className='recipientUser wrappBlocks'>
        <div>File: {file.title}</div>
        <div>For user:</div>
        <img className='avatar' src={file.vkUser.photo} alt="avatar" />
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