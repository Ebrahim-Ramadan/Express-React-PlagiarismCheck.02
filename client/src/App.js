import React from 'react'
import { InputModal } from './components/Input'
import { Sharmo } from './components/Sharmo'
import { ToastContainer } from 'react-toastify';

 const App = () => {
  return (
    <>
      <div>
        <Sharmo/>
      </div>
        <div>

<InputModal/>
</div>
<ToastContainer/>
    </>

  )
}
export default App