import Header from "./components/Header"
import Footer from "@/components/Footer"
import Counter from "./pages/Counter"


function App() {
  return (
    <div className="md:max-w-8/12 mx-auto bg-amber-200">
    <Header />
    <Counter />
    <Footer />
    </div>
  )
}

export default App
