import UserInteractionForm from '../components/UserInteractionForm';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers like toBeInTheDocument

describe('UserInteractionForm', () => {
    // --- 1. Testing Text Elements ---
    test('render the main heading and initial welcome', () => {
         render(<UserInteractionForm />);

         const headingElement = screen.getByRole('heading', { name: /user interaction test component/i });
         expect(headingElement).toBeInTheDocument();

        // Test Initial Message (dynamic text)
        const messageElement = screen.getByTestId('message-display');
        expect(messageElement).toHaveTextContent('welcome! Fill out the form');
    });

    test('updates the message when the "click me button is clicked', () => {
         render(<UserInteractionForm />);

       const clickMeButton = screen.getByRole('button', { name: /click me/i})
       const messageElement = screen.getByTestId('message-display');

       fireEvent.click(clickMeButton);
       expect(messageElement).toHaveTextContent('Button clicked!');
    });

    // --- 3. Testing Form Interaction and Submission ---
    test('handle input change and successful form submission', () => {
         render(<UserInteractionForm />);

        // Find the input and the form submit button
        const nameInput = screen.getByLabelText(/name:/i);
        const submitButton = screen.getByRole('button', { name: /Submit Form/i });
        const messageElement = screen.getByTestId('message-display');

        // Initially, the submit button should be disabled (as per component logic)
        expect(submitButton).toBeDisabled();
        // Simulate user typing into the input field
        const userName = 'andy';
        fireEvent.change(nameInput, {target: {value: userName}});

        //After typing, the button should be enabled
        expect(submitButton).toBeEnabled();
        expect(nameInput).toHaveValue(userName);

        // Simulate form submission
        fireEvent.click(submitButton);

        //Assert that the message has updated after submission
        expect(messageElement).toHaveTextContent(`Hello ${userName}! Your form has been submitted!`);
        // Assert that the input has been cleared
        expect(nameInput).toHaveValue(   'andy');  //no correct
        expect(nameInput).toHaveValue(   'andy');  //no correct

    })

});