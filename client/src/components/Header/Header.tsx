import { useEffect, useState } from 'react';
import apiClass from '../../utils/api/api.class';
import { User } from '../../domains/router/interfaces';

export function Header() {
    require('./Header.css');
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState<Boolean>(true);
    const [scrolled, setScrolled] = useState<Boolean>(false);

    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 1) {
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    };
    /* useEffect(() => {
        apiClass.getUserDetails(cookies).then(({data}) => {
            setUser(data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, [cookies]); */
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
    });
    let navbarClasses = ['navbar'];
    if (scrolled) {
        navbarClasses.push('scrolled');
    }
    return (
        <header className={navbarClasses.join(' ')}>
            <nav className='navigation'>
                <ul>
                    <li onClick={() => (window.location.href = `/`)}>
                        <a href={`/`}>Home</a>
                    </li>
                    {loading ? (
                        <li onClick={() => (window.location.href = ``)}>
                            <a href={`/`}>Loading...</a>
                        </li>
                    ) : user ? (
                        <li
                            onClick={() =>
                                (window.location.href = `/dashboard`)
                            }>
                            <a href={`/dashboard`}>Dashboard</a>
                        </li>
                    ) : (
                        <>
                            <li
                                onClick={() =>
                                    (window.location.href = `/login`)
                                }>
                                <a href={`/login`}>Sign In</a>
                            </li>
                            <li
                                onClick={() =>
                                    (window.location.href = `/register`)
                                }>
                                <a href={`/register`}>Sign Up</a>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}
