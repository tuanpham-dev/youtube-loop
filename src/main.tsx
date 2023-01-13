import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './components/App/App'
import './css/global.css'
import { State } from './store/types'
import { loadState, saveState } from './utils/localStorage'
import throttle from 'lodash.throttle'

const state: State | undefined = loadState()

const initialState: State = {
  videos: [],
  playingVideo: null,
  isPaused: false,
  ...state
}

const store = configureStore(initialState)

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
