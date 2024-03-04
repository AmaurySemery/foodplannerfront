import FoodItem from "../interfaces/FoodItem"
import styles from './fooditem.module.css'

interface Props {
    item: FoodItem
}

function FoodCard({ item }: Props) {
  function niceDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  return (
    <div className={styles.card}>
        <h3>{item.name}</h3>
        <div>Date added: {niceDate(item.dateAdded)}</div>
        <div>Max stay in freezer: {item.maxStayInFreezerInMonth} months</div>
        <div>Category: {item.foodCategory}</div>
    </div>
  )
}

export default FoodCard