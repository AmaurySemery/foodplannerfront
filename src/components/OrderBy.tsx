import styles from './orderby.module.css'

function OrderBy() {
    return (
        <>
            <h4>OrderBy</h4>
            <div>
                Name
                <label className={styles.switch}>
                    <input type="checkbox" />
                    <span className={`${styles.slider} ${styles.round}`}></span>
                </label>
            </div>
        </>

    )
}

export default OrderBy