import React, {useEffect, useState} from 'react';

const {VK} = window;
VK.init({apiId: 51775610});

const Auth = () => {
    let [user, setUser] = useState();
    let [token, setToken] = useState(sessionStorage.getItem('jwt') ?? '');

    useEffect(() => {
        sessionStorage.setItem('jwt', token);
        Auth.loader().then(auth => setUser(auth));
    }, [token]);

    useEffect(() => {
        if (user != null) {
            return;
        }

        VK.Widgets.Auth("vk_auth", {onAuth});
    }, [user]);

    if (user === undefined) {
        return <div>Loading...</div>;
    }

    async function onAuth(user) {
        let token = await fetch(process.env.REACT_APP_API_URL + '/auth', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(d => d.json());
        setToken(token.token);
        console.log(token);
    }

    return (
        <div id="auth">
            {
                user == null ?
                    <div id="vk_auth"></div> :
                    <>
                        <img src={user.photo} alt="avatar"/>
                        <div>{user.firstName} {user.lastName}</div>
                        <button onClick={() => setToken('')}>Logout</button>
                    </>
            }
        </div>
    );
};

Auth.loader = async () => {
    let user = await fetch(process.env.REACT_APP_API_URL + `/auth/info`,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('jwt'),
            },
        }
    );

    if (user.ok === false) {
        return null;
    }

    return await user.json();
};

export default Auth;