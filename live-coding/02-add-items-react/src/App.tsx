import React, { useState } from 'react'
import './App.css'

type ItemId = `${string}-${string}-${string}-${string}-${string}`

interface Item {
  id: ItemId
  timestamp: number
  text: string
}

const INITIAL_ITEMS: Item[] = [
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Videojuegos'
  },
  {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    text: 'Libros'
  }
]

function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    /* const formData = new FormData(e.target as HTMLFormElement)
    const text = formData.get('item') as string
    setItems([...items, { id: crypto.randomUUID(), timestamp: Date.now(), text }]) */

    // usamos el currentTarget porque estamos escuchando el evento en el formulario.
    // e.target.value es para escuchar el evento onChange.
    const form = e?.currentTarget.elements

    // estrategia 1 => trampa TS no recomendada
    // const input = form?.namedItem('item') as HTMLInputElement

    // estrategia 1 => Asegurarse que realemnte es lo que es recomendada
    const input = form?.namedItem('item')
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input === null) return null

    const newItem = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      text: input.value
    }

    setItems((prevItems) => {
      return [...prevItems, newItem]
    })

    input.value = ''
  }

  const handleRemoveItem = (id: ItemId) => () => {
    setItems((prevItems) => {
      return prevItems.filter(currentItem => currentItem.id !== id)
    })
  }

  return (
    <main>
      <aside>
        <h1>Prueba tecnica de React</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            Elemento a introducir
            <input type='text' name='item' required placeholder='Videojuegos...' />
          </label>
          <button>Añadir elemento a la lista</button>
        </form>
      </aside>

      <section>
        <h2 style={{ marginBottom: '10px' }}>Lista de elementos</h2>
        {items.length === 0
          ? (<strong>No hay elementos en la lista</strong>)
          : (
            <ul>
              {
                items.map(item => {
                  return (
                    <li key={item.id}>
                      {item.text}
                      <button onClick={handleRemoveItem(item.id)}>
                        Eliminar elemento
                      </button>
                    </li>
                  )
                })
              }
            </ul>
          )
        }
      </section>

    </main>
  )
}

export default App
