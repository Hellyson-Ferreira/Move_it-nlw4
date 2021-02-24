import styles from "../styles/components/Profile.module.css"
export default function Profile(){
    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/Hellyson-Ferreira.png" alt="profile-image"/>
            <div>
                <strong>Hellyson Ferreira</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level 1
                </p>
            </div>
        </div>

    )

}