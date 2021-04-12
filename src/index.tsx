import { render } from 'react-dom'
import 'antd/dist/antd.css'
import { App } from './App'
import axios from 'axios'

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com'

render(<App />, document.getElementById('root'))
