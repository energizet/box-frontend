import React, {useEffect} from 'react';

const {VK} = window;
VK.init({apiId: 51775610});

const Auth = () => {
    useEffect(() => {
        //VK.Widgets.Auth("vk_auth", {authUrl: "/auth"});
    }, []);

    return (
        <div id="auth">
            <button onClick={async () => {

                let user = {
                    uid: 144273712,
                    firstName: 'Алексей',
                    lastName: 'Крикунов',
                    photo: 'https://sun1-89.userapi.com/s/v1/if2/xznq1fPzwxlZmmwq7ADhVURNNmYJFPnfRO80qxEiqrK1Rr69ZSXu-yccqFH26WpiPWxur7lsRT5hw9-Nqrn_AiVC.jpg?size=200x200&quality=96&crop=75,0,450,450&ava=1',
                    photoRec: 'https://sun1-89.userapi.com/s/v1/if2/fxXpA0f4rgSRT8OK9uSzt8sObQW2kRH-M0ef-AAZWt1Mp4-ZeX8QW-Jy35wHSMNvZ4v4T2nXbac8s6rYI5qnXWwV.jpg?size=50x50&quality=96&crop=75,0,450,450&ava=1',
                    hash: '02c81c732cabf87d941f821e17ef9bc9'
                };
                let token = await fetch(process.env.REACT_APP_API_URL + '/auth', {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(d => d.json());
                sessionStorage.setItem('jwt', token.token)
                console.log(token);

            }}>
                Auth
            </button>
            <div id="vk_auth"></div>
        </div>
    );
};

export default Auth;