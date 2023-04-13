import react ,{useState, useEffect}from "react";
import Card from "./Card";
import axios from "axios";
const Main=()=>{
    const optionalCategories = ["History","art","Biography","Computers","Medical","Poetry"]
    const [search,setSearch]=useState("");
    const [bookData,setData]=useState([]);
    const [sortMethod,setSortMethod]=useState("");
    const [categorie,setCategorie]= useState("") 
    const findBook = () =>{
        axios.get('https://www.googleapis.com/books/v1/volumes?q='+search+'+intitle+&orderBy=' + sortMethod + '&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU'+'&maxResults=40')
        .then(res=>{setData(res.data.items)
        console.log(res)})
        .catch(err=>console.log(err))
    }

    const formHandler = (e) =>{
        e.preventDefault();
        setSearch(e.target.bookName.value)
        setSortMethod(e.target.order.value)
        setCategorie(e.target.Categories.value)
    }

    useEffect(() => {
        findBook();
    }, [search, sortMethod, categorie]);


    return(
        <>
            <div className="header">
                    <div >
                        {/* <input type="text" placeholder="Enter Your Book Name"
                        value={search} onChange={e=>setSearch(e.target.value)}
                        onKeyPress={searchBook}/>
                        <button><i className="fas fa-search"></i></button> */}
                        <form onSubmit={formHandler} >
                            <label>
                                Book Name 
                                <input
                                name="bookName"
                                type="text"
                                required />
                            </label>
                            <label>
                                order:
                                <select
                                name="order"
                                required>
                                <option key="relevance">relevance</option>
                                <option key="newest">newest</option>
                                </select>
                            </label>
                            <label>
                                Categories:
                                <select
                                name="Categories">
                                <option key=""></option>
                                {optionalCategories.map(el =>(<option key={el}>{el}</option>))}
                                </select>
                            </label>
                            <button>Find Book</button>
                        </form>
                    </div>
                </div>

            <div className="container">
              {
                    <Card book={bookData.filter(el => {
                        return categorie === "" || el.volumeInfo.categories == categorie                
                })}/>
              }  
            </div>
        </>
    )
}
export default Main;