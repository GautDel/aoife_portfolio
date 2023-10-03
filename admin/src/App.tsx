import './App.css'
import NavItems from "./components/NavItems.tsx"
import SignIn from "./components/SignIn.tsx"
function App() {
  const signedIn = false
  

  function renderPage () {
    if (signedIn) {
      return (
        <NavItems/>
      )
    } else {
      return (
      <SignIn />
      )
    }
  }

  return (
    <>
    {renderPage()}
   </>
  )
}

export default App
