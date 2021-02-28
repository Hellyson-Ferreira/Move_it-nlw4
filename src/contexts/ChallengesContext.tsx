import { createContext, ReactNode, useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal'

interface ChallengesProviderProps {
    children: ReactNode,
    level: number,
    currentExperience: number,
    challengesCompleted: number,
}
interface Challenges {
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
    completeChallenge: () => void
    closeLevelModal: () => void
}
export const ChallengesContext = createContext({} as ChallengesContextData)
export function ChallengesProvider({ children,...rest }: ChallengesProviderProps) {
    const [level, setLevel] = useState(rest.level?? 1)
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
    
    const [activeChallenge, setActiveChallenge] = useState(null)
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission()
    }, [])

    useEffect(() => {
        Cookie.set('level', String(level))
        Cookie.set('currentExperience', String(currentExperience))
        Cookie.set('challengesCompleted', String(challengesCompleted))

    }, [level, currentExperience, challengesCompleted])
    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
    }
    function closeLevelModal() {
        setIsLevelUpModalOpen(false)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return
        }
        const { amount } = activeChallenge

        let finalExperience = currentExperience + amount

        if (finalExperience >= experienceToNextLevel) {

            finalExperience = finalExperience - experienceToNextLevel
            levelUp()
        }
        setCurrentExperience(finalExperience)
        setActiveChallenge(null)
        setChallengesCompleted(challengesCompleted + 1)

    }
    function resetChallenge() {
        setActiveChallenge(null)
    }
    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
        const challenge = challenges[randomChallengeIndex]

        setActiveChallenge(challenge)
        new Audio('/notification.mp3').play()

        if (Notification.permission == 'granted') {
            new Notification('Novo desafio', {
                body: `Valendo ${challenge.amount}xp!`
            })
        }
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
                    experienceToNextLevel,
                    completeChallenge,
                    closeLevelModal
                }
            }
        >
            {children}
            {isLevelUpModalOpen && <LevelUpModal/>}
        </ChallengesContext.Provider>

    )
}