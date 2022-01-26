import React from 'react'
import styles from './Home.module.css'
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Button/Button'

const Home = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };

    const navigate = useNavigate();

    function startRegister() {
        navigate('/register');
        // console.log('button clicked')
    }

    return ( 
        <div className={styles.cardWrapper}>
            <Card title="Welcome to Coders House!" icon="logo">
                <p className={styles.text}>
                    Coders House is a place to listen in on fascinating 
                    conversations, talk with the world's most amazing 
                    people, and make new friends from all walks of 
                    life. It's so much more than just social media or 
                    audio - everyone can be a creator, all you need is 
                    your voice!
                    </p>
                    <div>
                        <Button onClick={startRegister} text="Get your username" />
                    </div>
                    <div className={styles.signinWrapper}>
                        <span className={styles.hasInvite}>Have an invite text?</span>
                        <Link style={signInLinkStyle} to="/login">Sign in</Link>
                    </div>
            </Card>
        </div>
    )
}

export default Home