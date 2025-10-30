import React, {useState} from "react";

const UserInteractionForm = () => {

    const [inputValue, setInputValue] = useState("");
    const [ message, setMessage ] = useState("welcome! Fill out the form");

const handleChange = (e) => {
    setInputValue(e.target.value);
}

const handleSubmit = (e) => {
    e.preventDefault();
    if(inputValue) {
        setMessage(`Hello ${inputValue}! Your form has been submitted!`);
    } else {
        setMessage("Please enter your name before submitting the form.");
    }
}

const handleButtonClick = () => {
    setMessage("Button clicked!");
}

    return (
        <div>

            <h1>User Interaction Test Component</h1>

            {/* 2. Message Text (dynamic) */}
            <p data-testid="message-display">{message}</p>

            {/* 3. Button Element */}
            <button onClick={handleButtonClick}>Click Me</button>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name-input">Name:</label>
                <input
                    id="name-input"
                    type="text"
                    onChange={handleChange}
                    value={inputValue}
                    placeholder="Enter your name"
                />
                <button type="submit" disabled={!inputValue}>Submit Form</button>
                <button type="submit" disabled={!inputValue}>Submit Form</button>
            </form>
        </div>
    )
}

export default UserInteractionForm;