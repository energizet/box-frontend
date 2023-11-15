import React, {useEffect} from 'react';

const {VK} = window;
VK.init({apiId: process.env.REACT_APP_VK_APP_ID});

const VkAuthWidget = ({onAuth}) => {
    useEffect(() => {
        VK.Widgets.Auth("vk_auth", {onAuth});
    }, []);
    return (
        <div id="vk_auth"></div>
    );
};

export default VkAuthWidget;