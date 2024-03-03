import FoodItem from "../interfaces/FoodItem"
import styles from './fooditem.module.css'

interface Props {
    item: FoodItem
}

function FoodCard({ item }: Props) {
  return (
    <div className={styles.card}>
        <h3>{item.name}</h3>
    </div>
  )
}

export default FoodCard