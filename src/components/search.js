import React from 'react';

const SearchForm = (props) => {
    const { input, handleChange, handleSearch } = props;

    return (
        <div className="searc-form">
            <form>
                <label>City</label>
                <input type="text" value={input} onChange={handleChange}></input>
                <button type="button" onClick={() => handleSearch(input)}>Search</button>
            </form>

        </div>
    )
}

export default SearchForm;