/**
 * src/App.jsx
 */


import {
  HashRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import { Provider } from './state'
import {
  Frame,
  GameWrapper,
  NotFound
 } from './pages'
import './css/app.css'


function App() {
  return (
    <Router>
      <Provider>
        <Routes>
          <Route path="/" element={<Frame />}>
            <Route
              index
              element={<GameWrapper />}
            />
            <Route
              path="/:name/*"
              element={<GameWrapper />}
            />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Provider>
    </Router>
  )
}


export default App