import { useState } from "react"
import { type Item } from "../App"
import { type ItemId } from "../components/Item"

export function useItems() {
  const [items, setItems] = useState<Item[]>([])

  const addItem = (text: string) => {

    const newItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })
  }

  const removeItem = (id: ItemId) => {
    setItems((prevItems) => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return {
    items,
    addItem,
    removeItem
  }
}