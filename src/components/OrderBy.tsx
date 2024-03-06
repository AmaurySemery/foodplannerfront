import { ChangeEvent } from 'react';
import styles from './orderby.module.css'

interface Props {
    orderItem: (parameter: string) => void;
}

function OrderBy({orderItem}: Props) {
    function handleNameChange(e: ChangeEvent & { target: HTMLInputElement }) {
        console.log(e.target.checked)
        const isChecked = e.target.checked
        if (isChecked) {
            orderItem('name')
        } else {
            orderItem('nameoff')
        }
    }

    return (
        <>
            <h4>OrderBy</h4>
            <div className={styles.center}>
                Name
                <label className={styles.switch}>
                    <input type="checkbox" onChange={e => handleNameChange(e)} />
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