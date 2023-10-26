import { describe, test, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../src/hooks/useItems'

describe('useItems hook', () => {
  test('should add and remove items', () => {
    const { result } = renderHook(() => useItems())

    expect(result.current.items.length).toBe(0)

    // No podemos hacer esto, porue cuando hacemos una accioòn de reenderzar un componente y tenemos que esperar a leer un valor, el problema es que es asincorno, y si lanzamos esto tendremos el valor anterior siempre, porque no nos asegura que el valor asincrono se actualizo.
    // result.current.addItem('Jugar videojuegos')

    // con este act resolvemos el problema anterior, porque el act ejecuta al y reenderiza inmediatamente la funcion que queremos testear-

    // addItem
    act(() => {
      result.current.addItem('Jugar videojuegos')
      result.current.addItem('Ir a correr')
    })
    expect(result.current.items.length).toBe(2)

    // removeIte,
    act(() => {
      result.current.removeItem(result.current.items[0].id)
    })

    expect(result.current.items.length).toBe(1)
  })
})