import React, { useEffect, useState } from 'react';
import VkAuthWidget from "./VkAuthWidget";
import { Link } from 'react-router-dom';

const Auth = () => {
    let [user, setUser] = useState();
    let [token, setToken] = useState(sessionStorage.getItem('jwt') ?? '');

    useEffect(() => {
        sessionStorage.setItem('jwt', token);
        Auth.loader().then(auth => setUser(auth));
    }, [token]);

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
            <div className="logoBlock">
                <Link><h1>Box</h1></Link>

            </div>
            <div className="authBlock wrappBlocks">
                {
                    user == null ?
                        <VkAuthWidget onAuth={onAuth} /> :
                        <>
                            <img className='avatar' src={user.photo} alt="avatar" />
                            <div className="infoBlock">
                                <div className='userName'>{user.firstName} {user.lastName}</div>
                                <button className='authButton' onClick={() => setToken('')}>Logout</button>
                            </div>
                        </>
                }
            </div>
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