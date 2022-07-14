import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import {
  addNewCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/Cycles/actrions'
import { Cycle, cyclesReducer } from '../reducers/Cycles/reducer'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  finishCurrentCycle: () => void
  interruptCurrentCycle: () => void
  setSecondsPassed: (seconds: number) => void
  createCycle: (data: CreateCycleData) => void
}

interface CyclesState_1_0_0 {
  cycles: {
    id: string
    task: string
    minutesAmount: number
    startDate: string
    interruptedDate?: string
    finishedDate?: string
  }[]
  activeCycleId: string | null
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export const CyclesContext = createContext({} as CyclesContextData)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesReducer,
    {
      cycles: [],
      activeCycleId: null,
    },
    () => {
      const storagedData = localStorage.getItem(
        'WorkTimerApp:CyclesState:1.0.0',
      )
      if (storagedData) {
        const parsedData = JSON.parse(storagedData) as CyclesState_1_0_0
        const parsedCycles = parsedData.cycles.map((cycle) => {
          return {
            ...cycle,
            startDate: new Date(cycle.startDate),
            finishedDate: cycle.finishedDate
              ? new Date(cycle.finishedDate)
              : undefined,
            interruptedDate: cycle.interruptedDate
              ? new Date(cycle.interruptedDate)
              : undefined,
          }
        })
        return { ...parsedData, cycles: parsedCycles }
      }
      return {
        cycles: [],
        activeCycleId: null,
      }
    },
  )

  useEffect(() => {
    localStorage.setItem(
      'WorkTimerApp:CyclesState:1.0.0',
      JSON.stringify(cyclesState),
    )
  }, [cyclesState])

  const { cycles, activeCycleId } = cyclesState

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function finishCurrentCycle() {
    dispatch(finishCurrentCycleAction())
  }

  function createCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        amountSecondsPassed,
        finishCurrentCycle,
        interruptCurrentCycle,
        setSecondsPassed,
        createCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
