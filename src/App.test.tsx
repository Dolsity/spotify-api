import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { WrappedApp, App } from './App'

describe('App', () => {
  it('Renders spotify-api title', () => {
    // ARRANGE
    render(<WrappedApp />)
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('spotify-api')
  })
  it('Renders not found if invalid path', () => {
    // ARRANGE
    render(
      <MemoryRouter initialEntries={['/invalid-path']}>
        <App />
      </MemoryRouter>
    )
    // ACT
    // EXPECT
    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent('Not Found!')
  })
})
