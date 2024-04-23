import React, { useState } from 'react'

function RandomNumberPage() {
    const [randomNumber, setRandomNumber] = useState(null)

    const generateRandomNumber = () => {
        const min = 1
        const max = 100
        const random = Math.floor(Math.random() * (max - min + 1)) + min
        setRandomNumber(random)
    }

    return (
        <div>
            <h1>Random Number Generator</h1>
            <p>Click the button to generate a random number:</p>
            <button onClick={generateRandomNumber}>
                Generate Random Number
            </button>
            {randomNumber && <p>Random Number: {randomNumber}</p>}
        </div>
    )
}

export default RandomNumberPage
