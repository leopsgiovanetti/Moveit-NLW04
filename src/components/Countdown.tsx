import { useState, useEffect, useContext } from 'react';
import { ChalengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css';




export function Countdown() {
    const {
        minutes,
        seconds,
        HasFinished,
        isActive,
        resetCountDown,
        startCountDown
    } = useContext(CountdownContext)

    const [minutesLeft, minutesRight] = String(minutes).padStart(2, '0').split('');
    const [secondsLeft, secondsRight] = String(seconds).padStart(2, '0').split('');



    return (
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minutesLeft}</span>
                    <span>{minutesRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondsLeft}</span>
                    <span>{secondsRight}</span>
                </div>
            </div>

            {HasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}>
                    Ciclo finalizado
                </button>
            )
                : (
                    <>
                        {isActive ?
                            (
                                <button
                                    type="button"
                                    className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                                    onClick={resetCountDown}>
                                    Abandonar o ciclo
                                </button>
                            ) :
                            (
                                <button
                                    type="button"
                                    className={styles.countdownButton}
                                    onClick={startCountDown}>
                                    Iniciar um ciclo
                                </button>
                            )}
                    </>
                )
            }



        </div>

    )
}