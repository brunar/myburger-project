import { useState, useEffect } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);

    //on the request clean the error
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        //console.log(err);
        setError(err);
    });

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]); //this ensures that we clean this up whenever our interceptors change

    const errorConfirmedHandler = () => {
        setError(null);
    }
    return [error, errorConfirmedHandler]
}