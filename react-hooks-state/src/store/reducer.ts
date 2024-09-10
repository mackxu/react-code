export type State = {
  foo: string,
}

export type Action = {
  type: string,
  payload: Partial<State>,
}

export const initailState: State = {
  foo: 'foo',
};

export function reducer(state: State, action: Action) {
  switch(action.type) {
    case 'update': {
      return { ...state, ...action.payload }
    }
    default:
      throw new Error();
  }
}

// actions.update({ foo: 'abc' })
export const actions = {
  update: (payload: any) => ({
    type: 'update',
    payload,
  })
}