/* eslint-disable no-unused-vars */
import React from 'react'
import styles from './Home.module.css'
import { Link, useHistory } from 'react-router-dom'
import Card from '../../components/shared/Card/Card'
import Button from '../../components/shared/Button/Button'

const Home = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };

    const history = useHistory();

    function startRegister() {
        history.push('/authenticate');
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
                        <Button onClick={startRegister} text="Let's Go" />
                    </div>
                    <div className={styles.signinWrapper}>
                        <span className={styles.hasInvite}>Have an invite text?</span>
                        {/* <Link style={signInLinkStyle} to="/login">Sign in</Link> */}
                    </div>
            </Card>
        </div>
    )
}

export default Home