import App from './components/App'
import Home from './components/Home'

export default {
  path: '/',
  component: App,
  indexRoute: {
    onEnter(nextState, replace) {
      replace('/pageset/list')
    }
  },
  childRoutes: [
    {
      path: 'home',
      component: Home
    },
    {
      path: '*',
      onEnter(nextState, replace) {
        replace('home')
      }
    }
  ]
}
