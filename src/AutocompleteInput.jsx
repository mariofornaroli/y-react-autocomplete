import React, { useRef, useState, useEffect } from 'react'
import './AutocompleteInput.css';

function AutocompleteInput({ options }) {
    const [showOptions, setShowOptions] = useState(false);
    const [album, setAlbum] = useState('');
    const autocompleteRef = useRef(null);

    const selectElementHandler = (newAlbumValue) => {
        setAlbum(newAlbumValue);
        setShowOptions(false);
    }

    useEffect(() => {
        window.addEventListener("mousedown", clickOutsideHandler)
        return () => {
            window.removeEventListener("mousedown", clickOutsideHandler)
        }
    }, [])

    const clickOutsideHandler = (ev) => {
        if (autocompleteRef &&
            autocompleteRef.current && 
            !autocompleteRef.current.contains(ev.target)) {
                setShowOptions(false)
            }
    }

    return (
        <div className="autocomplete" ref={autocompleteRef}>
            <input
                placeholder="Type album here"
                onClick={() => setShowOptions(!showOptions)}
                value={album}
                onChange={e => setAlbum(e.target.value)} />
            {showOptions &&
                <ul className="options">
                    {
                        options
                            .filter(opt => opt.title.toLowerCase().indexOf(album.toLowerCase()) >= 0)
                            .map(opt => (<li
                                key={opt.id}
                                onClick={() => selectElementHandler(opt.title)}
                            >
                                {opt.title}
                            </li>
                            ))
                    }
                </ul>
            }
        </div>
    )
}

export default AutocompleteInput
