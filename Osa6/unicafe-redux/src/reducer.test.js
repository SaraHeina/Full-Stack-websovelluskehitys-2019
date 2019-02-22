import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good and bad are incremented', () => {
    deepFreeze(initialState)
    const newState = counterReducer(initialState, { type: 'GOOD' })
    deepFreeze(newState)
    const finalState = counterReducer(newState, { type: 'BAD' })
    expect(finalState).toEqual({
      good: 1,
      ok: 0,
      bad: 1
    })
  })

  test('ok and zero incremented', () => {
    deepFreeze(initialState)
    const newState = counterReducer(initialState, { type: 'OK' })
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0
    })
    deepFreeze(newState)
    const finalState = counterReducer(newState, { type: 'ZERO' })
    expect(finalState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })
  })
})