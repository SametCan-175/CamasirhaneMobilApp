import React, { createContext, useContext, useReducer } from 'react';

type MachineType = 'wash' | 'dry';
type Status = 'free' | 'busy';

export type Machine = {
  id: string;
  name: string;
  type: MachineType;
  status: Status;
  startedAt?: number;
  duration?: number;
};

type State = {
  machines: Machine[];
};

type Action =
  | {
      type: 'RESERVE_MACHINE';
      payload: {
        id: string;
        duration: number;
      };
    };

const initialState: State = {
  machines: [
    // 🧺 YIKAMA MAKİNELERİ
    ...Array.from({ length: 12 }, (_, i) => ({
      id: `wash-${i + 1}`,
      name: `Yıkama ${i + 1}`,
      type: 'wash' as const,
      status: 'free' as const,
    })),

    // 🔥 KURUTMA MAKİNELERİ
    ...Array.from({ length: 12 }, (_, i) => ({
      id: `dry-${i + 1}`,
      name: `Kurutma ${i + 1}`,
      type: 'dry' as const,
      status: 'free' as const,
    })),
  ],
};


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'RESERVE_MACHINE':
      return {
        machines: state.machines.map((m) =>
          m.id === action.payload.id
            ? {
                ...m,
                status: 'busy',
                startedAt: Date.now(),
                duration: action.payload.duration,
              }
            : m
        ),
      };

    default:
      return state;
  }
}

const MachineContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function MachineProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MachineContext.Provider value={{ state, dispatch }}>
      {children}
    </MachineContext.Provider>
  );
}

export function useMachines() {
  const context = useContext(MachineContext);
  if (!context) {
    throw new Error('useMachines must be used inside MachineProvider');
  }
  return context;
}
