import { useState } from "react"
import { add } from "date-fns"
import FoodItem from "../interfaces/FoodItem"
import styles from './fooditem.module.css'

import 'react-responsive-modal/styles.css'
import Modal from "react-responsive-modal"
import FormCreateFood from "./FormCreateFood"

interface Props {
  item: FoodItem;
  deleteItem: (id: string) => void;
}

function FoodCard({ item, deleteItem }: Props) {
  const [open, setOpen] = useState(false)
  const [openUpdate, setOpenUpdate] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  const onOpenUpdateModal = () => setOpenUpdate(true)
  const oncloseUpdateModal = () => setOpenUpdate(false)

  function niceDate(date: Date): string {
    return date.toISOString().split('T')[0]
  }

  function deleteFoodItem(id: string) {
    deleteItem(id)
    onCloseModal()
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
            <button onClick={() => deleteFoodItem(item.id)}>Delete</button>{' '} <button onClick={onCloseModal}>Cancel</button>
          </p>
        </Modal>
        {' '}
        <button onClick={onOpenUpdateModal}>Update</button>
        <Modal open={openUpdate} onClose={oncloseUpdateModal} classNames={{
          overlay: 'customOverlay',
          modal: 'customModal'
        }} center>
          <h2>Update {item.name}</h2>
          <FormCreateFood />
        </Modal>
      </div>

    </div>
  )
}

export default FoodCard