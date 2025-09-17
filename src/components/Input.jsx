import React from 'react'

const Input = ({ addUser, inpt, setInpt }) => {
    return (
        <div>
            <input
                type="text"
                placeholder='Name'
                value={inpt}
                onChange={(e) => {
                    setInpt(e.target.value)
                }}
            />
            <button onClick={() => {
                if (inpt)
                    addUser({ name: inpt })
            }}>Submit</button>
        </div>
    )
}

export default Input
