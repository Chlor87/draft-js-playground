import {useRouterHistory} from 'react-router'
import createHistory from 'history/lib/createHistory'

export default useRouterHistory(createHistory)({
  basename: '/'
})
