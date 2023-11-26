import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Cities } from './Cities'
import { useCities } from '@/app/hooks/useCities'
import '@testing-library/jest-dom'

jest.mock('../../hooks/useCities', () => ({
  ...jest.requireActual('../../hooks/useCities'),
  useCities: jest.fn(),
}))

const mockUseCities = useCities as jest.MockedFunction<typeof useCities>

describe('Cities component', () => {
  beforeEach(() => {
    mockUseCities.mockReset()
  })

  test('renders cities when citiesArr is not empty', async () => {
    mockUseCities.mockReturnValue({
      citiesArr: ['London', 'Paris'],
      isLoading: false,
      removeAllCities: jest.fn(),
    })

    render(<Cities />)

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument()
      expect(screen.getByText('Paris')).toBeInTheDocument()
    })

    expect(
      screen.queryByText("You don't added any cities yet"),
    ).not.toBeInTheDocument()
  })

  test('renders message when citiesArr is empty', () => {
    mockUseCities.mockReturnValue({
      citiesArr: [],
      isLoading: false,
      removeAllCities: jest.fn(),
    })

    render(<Cities />)

    expect(
      screen.getByText("You don't added any cities yet"),
    ).toBeInTheDocument()
  })

  test('renders spinner when isLoading is true', () => {
    mockUseCities.mockReturnValue({
      citiesArr: [],
      isLoading: true,
      removeAllCities: jest.fn(),
    })

    render(<Cities />)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  test('calls removeAllCities when "Remove all" button is clicked', async () => {
    const removeAllCitiesMock = jest.fn()
    mockUseCities.mockReturnValue({
      citiesArr: ['London', 'Paris'],
      isLoading: false,
      removeAllCities: removeAllCitiesMock,
    })

    render(<Cities />)

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument()
      expect(screen.getByText('Paris')).toBeInTheDocument()
    })

    await userEvent.click(screen.getByText('Remove all'))

    expect(removeAllCitiesMock).toHaveBeenCalledTimes(1)
  })
})
