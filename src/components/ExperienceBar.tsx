import { useContext } from 'react';
import { ChalengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar() {

    const { currentXP, experienceToNextLevel } = useContext(ChalengesContext);

    const percentToNextLevel = Math.round(currentXP / experienceToNextLevel * 100);

    return (
        <header className={styles.experienceBar}>
            <span> 0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} /> {/*estilo variavel inline (vai variar com JS)*/}
                <span className={styles.currentXp} style={{ left: `${percentToNextLevel}%` }}> {currentXP} xp </span>
            </div>
            <span> {experienceToNextLevel} xp</span>
        </header>
    )
}