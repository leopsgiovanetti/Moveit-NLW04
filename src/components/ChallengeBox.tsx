
import { useContext } from 'react';
import { ChalengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChallengeBox.module.css';

export function ChallengeBox() {

    const { activeChallenge, resetChallenge, completeChallenge } = useContext(ChalengesContext)

    const {
        minutes,
        seconds,
        HasFinished,
        isActive,
        resetCountDown,
        startCountDown
    } = useContext(CountdownContext)

    function handleChallengeSucceeded() {
        completeChallenge()
        resetCountDown()
    }

    function handleChallengeFailed() {
        resetChallenge()
        resetCountDown()
    }


    return (

        <div className={styles.challengeBoxContainer}>
            {activeChallenge ?
                (
                    <div className={styles.challengeActive}>
                        <header>Ganhe {activeChallenge.amount} XP</header>
                        <main>
                            <img src={`icons/${activeChallenge.type}.svg`} alt="challenge" />
                            <strong>Novo Desafio</strong>
                            <p>{activeChallenge.description}</p>
                        </main>
                        <footer>
                            <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailedButton}>Falhei</button>
                            <button type="button" onClick={handleChallengeSucceeded} className={styles.challengeSucceededButton}>Completei</button>
                        </footer>
                    </div>
                ) : (
                    <div className={styles.challengeNotActive}>
                        <strong>Inicie um ciclo para receber desafios a serem completados</strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level up" />
                        Complete-os, ganhe experiência e suba de level!</p>
                    </div>
                )}

        </div>

    )
}