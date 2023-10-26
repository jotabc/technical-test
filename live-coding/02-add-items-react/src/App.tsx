import { Item, ItemId } from './components/Item'
import { useItems } from './hooks/useItems'

import './App.css'
import { useSEO } from './hooks/useSeo'

export interface Item {
  id: ItemId
  timestamp: number
  text: string
}

function App() {
  const { items, addItem, removeItem } = useItems()

  useSEO({
    title: `[${items.length}] - Prueba tecnica de React`,
    description: 'Añadir y eliminar elementos de una lista'
  })

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

    addItem(input.value)

    input.value = ''
  }

  const handleRemoveItem = (id: ItemId) => () => {
    removeItem(id)
  }

  return (
    <main>
      <aside>
        <h1>Prueba tecnica de React</h1>
        <h2>Añadir y eliminar elementos de una lista</h2>
        <form onSubmit={handleSubmit} aria-label='Añadir elementos a la lista'>
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
                  return <Item handleClick={handleRemoveItem(item.id)} {...item} key={item.id} />
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

// UN REFACTOR GRANDE EN UNA APP TIENE QUE TENER O SER EN BASE A UN TEST SIEMPRE.