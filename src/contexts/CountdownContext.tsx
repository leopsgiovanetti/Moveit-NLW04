import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChalengesContext } from '../contexts/ChallengesContext';

interface CountdownContextData {
    minutes: number;
    seconds: number;

    HasFinished: boolean;
    isActive: boolean;
    startCountDown: () => void;
    resetCountDown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countDownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)


export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChalengesContext)


    const [time, setTime] = useState(25 * 60)

    const [isActive, setIsActive] = useState(false)

    const [HasFinished, setHasFinished] = useState(false)

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    function startCountDown() {
        setIsActive(true)
    }

    function resetCountDown() {
        clearTimeout(countDownTimeout)
        setIsActive(false)
        setTime(0.1 * 60)
        setHasFinished(false)

    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeout = setTimeout(() => {
                setTime(time - 1)
            }, 1000)
        }
        else if (isActive && time === 0) {
            console.log("finalizou")
            setHasFinished(true)
            setIsActive(false)
            startNewChallenge();
        }
    }, [isActive, time])

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            HasFinished,
            isActive,
            startCountDown,
            resetCountDown

        }}>
            {children}
        </CountdownContext.Provider>
    )
}