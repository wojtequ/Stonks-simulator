import React, {Fragment} from 'react'


export const HomePage = ()=>{

    const handleLogout = () => {
        sessionStorage.removeItem('jwt');
        window.location.reload();
    };
    return(
        <Fragment>
            <h1>sample home page</h1>
            <button onClick={handleLogout}>Wyloguj</button>
        </Fragment>
    )
}
