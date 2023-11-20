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
            <div className="authBlock">
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
                {
                    user == null ? <button onClick={async () => {

                        let user = {
                            "uid": 397839542,
                            "first_name": "Артур",
                            "last_name": "Сацкий",
                            "photo": "https://sun9-20.userapi.com/s/v1/if2/xznq1fPzwxlZmmwq7ADhVURNNmYJFPnfRO80qxEiqrK1Rr69ZSXu-yccqFH26WpiPWxur7lsRT5hw9-Nqrn_AiVC.jpg?size=200x200&amp;quality=96&amp;crop=75,0,450,450&amp;ava=1",
                            "photo_rec": "https://sun9-20.userapi.com/s/v1/if2/fxXpA0f4rgSRT8OK9uSzt8sObQW2kRH-M0ef-AAZWt1Mp4-ZeX8QW-Jy35wHSMNvZ4v4T2nXbac8s6rYI5qnXWwV.jpg?size=50x50&amp;quality=96&amp;crop=75,0,450,450&amp;ava=1",
                            "hash": "dd9a8d6150b8291d678b0e9f16367701"
                        };
                        await onAuth(user);
                    }}>
                        Auth
                    </button> : null
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