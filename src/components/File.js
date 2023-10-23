import React from 'react';
import {useLoaderData} from "react-router-dom";

const File = () => {
    let file = useLoaderData();

    return (
        file == null ?
            <div>Not found</div> :
            <div id="file">
                <div>File: {file.title}</div>
                <div>For user:</div>
                <img src={file.vkUser.photo} alt="user photo"/>
                <div>{file.vkUser.first_name} {file.vkUser.last_name}</div>
            </div>
    );
};

File.loader = async (params) => {
    let file = await fetch(process.env.REACT_APP_API_URL + `/file/info/${params.id}`);
    if (file.ok === false) {
        return null;
    }

    return await file.json();
};

export default File;