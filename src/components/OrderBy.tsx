import styles from './orderby.module.css'

interface Props {
    orderItem: (parameter: string) => void;
}

function OrderBy({orderItem}: Props) {
    return (
        <>
            <h4>OrderBy</h4>
            <div className={styles.center}>
                Name
                <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
            </div>
            <div className={styles.center}>
                Max date
                <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
            </div>
        </>

    )
}

export default OrderBy