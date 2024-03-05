import { useState } from "react"
import { add } from "date-fns"
import FoodItem from "../interfaces/FoodItem"
import styles from './fooditem.module.css'

import 'react-responsive-modal/styles.css'
import Modal from "react-responsive-modal"

interface Props {
  item: FoodItem
}

function FoodCard({ item }: Props) {
  const [open, setOpen] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  function niceDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  return (
    <div className={styles.card}>
      <h3>{item.name}</h3>
      <div>Date added: {niceDate(item.dateAdded)}</div>
      <div>Max stay in freezer: {niceDate(add(item.dateAdded, { months: item.maxStayInFreezerInMonth }))}</div>
      <div>Category: {item.foodCategory}</div>
      <br />
      <div>
        <button onClick={onOpenModal}>Delete</button>
        <Modal open={open} onClose={onCloseModal} classNames={{
          overlay: 'customOverlay',
          modal: 'customModal'
        }} center>
          <h2>Delete {item.name} ?</h2>
          <p>
            Are you sure to delete {item.name} ?
            <br /><br />
            <button>Delete</button>{' '} <button onClick={onCloseModal}>Cancel</button>
          </p>
        </Modal>
      </div>

    </div>
  )
}

export default FoodCard