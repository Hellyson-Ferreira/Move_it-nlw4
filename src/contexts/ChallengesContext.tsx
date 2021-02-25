import { createContext, ReactNode, useState } from 'react'
import challenges from '../../challenges.json'

interface ChallengesProviderProps {
    children: ReactNode
}
interface Challenges{
    type: 'body' | 'ayers'
    description: string
    amount: number
}

interface ChallengesContextData {
    level: number
    currentExperience: number
    challengesCompleted: number
    experienceToNextLevel: number
    activeChallenge: Challenges
    levelUp: () => void
    startNewChallenge: () => void
    resetChallenge: () => void
}
export const ChallengesContext = createContext({} as ChallengesContextData )
export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1)
    const [currentExperience, setCurrentExperience] = useState(0)
    const [challengesCompleted, setChallengesCompleted] = useState(0)
    const [activeChallenge, setActiveChallenge] = useState(null)

    const experienceToNextLevel = Math.pow((level + 1) * 4,2)
    function levelUp() {
        setLevel(level + 1)
    }

    function resetChallenge(){
        setActiveChallenge(null)
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)
    }
    return (
        <ChallengesContext.Provider
            value={
                {
                    level,
                    currentExperience,
                    challengesCompleted,
                    levelUp,
                    startNewChallenge,
                    activeChallenge,
                    resetChallenge,
                    experienceToNextLevel
                    

                }
            }
        >
            {children}
        </ChallengesContext.Provider>

    )
}