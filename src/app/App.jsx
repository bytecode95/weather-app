import './App.css'
import Search from '../components/Search'

function App() {

  const handleonSearchChange = (searchData) =>{
    console.log(searchData);
  }

  return (
    <>
      <div className='container'>
        <Search onSearchChange={handleonSearchChange}/>
      </div>

    </>
  )
}

export default App
