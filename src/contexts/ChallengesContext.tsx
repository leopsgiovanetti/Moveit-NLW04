import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentXP: number;
    challengesCompleted: number;
}

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentXP: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    activeChallenge: Challenge;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;


}


export const ChalengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentXP, setCurrentXP] = useState(rest.currentXP ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [levelModalOpen, setLevelModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookie.set('level', String(level))
        Cookie.set('currentXP', String(currentXP))
        Cookie.set('challengesCompleted', String(challengesCompleted))
    }, [level, currentXP, challengesCompleted])

    function levelUp() {
        setLevel(level + 1)
        setLevelModalOpen(true)
    }

    function closeLevelUpModal() {
        setLevelModalOpen(false)
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]
        setActiveChallenge(challenge)

        new Audio('/notification.mp3').play()

        if (Notification.permission === "granted") {
            new Notification('Novo desafio!', {
                body: `Valendo ${challenge.amount} XP`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }

        const { amount } = activeChallenge;

        let finalXP = currentXP + amount;

        if (finalXP >= experienceToNextLevel) {
            levelUp()
            finalXP = finalXP - experienceToNextLevel
        }

        setCurrentXP(finalXP)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)

    }

    return (
        <ChalengesContext.Provider value={
            {
                level,
                currentXP,
                challengesCompleted,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                completeChallenge,
                closeLevelUpModal
            }}>
            { children}

            {levelModalOpen && <LevelUpModal />}
        </ChalengesContext.Provider>
    )
}