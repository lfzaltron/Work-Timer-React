import { Cycle } from './reducer'

/* eslint-disable no-unused-vars */
export enum ActionTypes {
  ADD_CYCLE = 'ADD_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionTypes.ADD_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function finishCurrentCycleAction() {
  return {
    type: ActionTypes.FINISH_CURRENT_CYCLE,
  }
}
