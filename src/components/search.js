import React, { useEffect } from 'react';

const SearchForm = (props) => {
    const { input, handleChange, handleSearch } = props;

    useEffect(() => {
        const handleSubmit = e => {
            e.preventDefault();
            console.log(e.srcElement[0].value);
            handleSearch(e.srcElement[0].value);
            console.log("from handle submit");

        }

        document.addEventListener("submit", handleSubmit);
        console.log("from use effect");

    }, [])

    return (
        <div className="search-bar">
            <form >
                <input type="text" value={input} onChange={handleChange}></input>
                <button type="submit" >Search</button>
            </form>

        </div >
    )
}

export default SearchForm;