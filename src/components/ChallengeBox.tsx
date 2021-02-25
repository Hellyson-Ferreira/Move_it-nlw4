import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox() {
    const {activeChallenge,resetChallenge} = useContext(ChallengesContext)
    
    return (
        <div className={styles.challengeBoxContainer}>
            {activeChallenge ? (
                <div className={styles.challengeBoxActive}>
                    <header>Ganhe {activeChallenge.amount} xp</header>

                    <main>
                            <img src={`icons/${activeChallenge.type}.svg`} />
                        <strong>Novo desafio</strong>
                        <p>{activeChallenge.description}</p>
                    </main>
                    <footer>
                        <button
                            type="button"
                            className={styles.challengeFailedButton}
                            onClick={resetChallenge}
                        > 
                            Falhei

                        </button>
                        <button
                            type="button"
                            className={styles.challengeSucceededButton}
                        >
                            Completei
                        </button>
                    </footer>

                </div>
            ) : (
                <div className={styles.challengeBoxNotActive}>
                    <strong>Finalize um ciclo para receber mais desafios</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level Up" />
                    Avance de level completando os desafios
                </p>
                </div>
            )}
        </div>
    )
}