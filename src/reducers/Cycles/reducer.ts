import { ActionTypes } from './actrions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_CYCLE: {
      const newState = { ...state }
      newState.cycles.push(action.payload.newCycle)
      newState.activeCycleId = action.payload.newCycle.id
      return newState
    }
    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      const newState = { ...state }
      newState.cycles = state.cycles.map((cycle) =>
        cycle.id === state.activeCycleId
          ? { ...cycle, interruptedDate: new Date() }
          : cycle,
      )
      newState.activeCycleId = null
      return newState
    }
    case ActionTypes.FINISH_CURRENT_CYCLE: {
      const newState = { ...state }
      newState.cycles = state.cycles.map((cycle) =>
        cycle.id === state.activeCycleId
          ? { ...cycle, finishedDate: new Date() }
          : cycle,
      )
      newState.activeCycleId = null
      return newState
    }
    default:
      return state
  }
}
