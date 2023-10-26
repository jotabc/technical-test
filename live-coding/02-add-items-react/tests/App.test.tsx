import React from 'react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('<App />', () => {
  // TEST UNITARIO
  test('should work', () => {
    // render(<App />)
    // screen.debug()

    // en el scren tenemos todo lo que el componente cargo.
    // screen.getByText('Prueba tecnica de React')
  })

  // TEST E2E
  test('should add an items and remove them', async () => {

    const user = userEvent.setup() // iniciamos un usario para poder interactuar con el DOM
    render(<App />) // reenderizamos el componente para poder obtener todo lo que reenderiza nuestra app.

    // getByRole => es el de mayor prioridad para buscar un elemento, como buena pràctica.
    const input = screen.getByRole('textbox')
    expect(input).toBeDefined()

    // search form el formulario tiene que tener un rol completo aqui para poder ser encontrado, debemos de colocar un aria-label al form.
    const form = screen.getByRole('form')
    expect(form).toBeDefined()

    const button = form.querySelector('button')
    expect(button).toBeDefined()

    await user.type(input, 'midudev')
    await user.click(button!)

    // asegurar que elemento se ha agregado
    const list = screen.getByRole('list')
    // screen.debug()
    expect(list).toBeDefined()

    expect(list.childNodes.length).toBe(1)

    // asegurarnos que podemos borrar
    // es buena practica siempre por ejm en este caso tenemos dos botones que hace dos cosas distintas, una buena practica siempre es buscar el item o el contenedor que tiene dicho boton, en este caso enconytramos el item que serìa el elemento nuevo que agregamos a la lista y cada elemento tiene el botòn eliminar.
    const item = screen.getByText('midudev')
    const removeButton = item.querySelector('button')
    expect(removeButton).toBeDefined()

    await user.click(removeButton!)

    const noResult = screen.getByText('No hay elementos en la lista')
    expect(noResult).toBeDefined()

  })
})
