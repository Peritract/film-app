import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const SearchPage = () => {

    const [inputValue, setInputValue] = useState("");
    const [submitValue, setSubmitValue] = useState("Gossip Girl");
    const [showData, setShowData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        async function searchApi(searchString) {
            try {
                const result = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchString}`);
                setShowData(result.data);
            } catch (err) {
                console.log(err);
            }
        }
        searchApi(submitValue);

    }, [submitValue]);

    function handleInput(e) {
        const newInput = e.target.value;
        setInputValue(newInput);
    }

    function handleSubmit(e) {
        setSubmitValue(inputValue);
        setInputValue("");
    }

    function renderShows() {
        return showData.map((s, i) => <li key={i}
                                       className="show-link"
                                       onClick={() => { navigate (`/search/${s.show.name}` )}}>
                                       {s.show.name}
                                       </li>)
    }

    return <>
            <h2>Search</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" onChange={handleInput} value={inputValue}></input>
                <button type="submit">Search</button>
            </form>
            <ol>{ renderShows() }</ol>
           </>
}

export default SearchPage;