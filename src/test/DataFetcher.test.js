import { render, screen } from '@testing-library/react';
import DataFetcher from './DataFetcher';
import '@testing-library/jest-dom';

// 1. Define the successful mock data
const mockUserData = {
    name: 'Mocked User'
};

// Start of the test suite
describe('DataFetcher Component', () => {

    // A variable to hold the original fetch function
    let fetchSpy;

    // Setup: Run before each test
    beforeEach(() => {
        // 2. Spy on the global 'fetch' function
        fetchSpy = jest.spyOn(global, 'fetch');
    });

    // Cleanup: Run after each test to restore original functions
    afterEach(() => {
        // 3. Restore the original 'fetch' to prevent side effects in other tests
        fetchSpy.mockRestore();
    });

    // --- Test Case 1: Successful Data Fetch ---
    test('displays the fetched user name after a successful API call', async () => {

        // 4. Implement the mock behavior for 'fetch'
        fetchSpy.mockImplementation(() =>
            // Mock a resolved Promise for the response
            Promise.resolve({
                ok: true,
                // Mock the .json() method to return our mock data
                json: () => Promise.resolve(mockUserData),
            })
        );

        // Render the component (which triggers the useEffect and the mocked fetch)
        render(<DataFetcher />);

        // Initial state check (synchronous)
        expect(screen.getByText('Loading...')).toBeInTheDocument();

        // 5. Use 'findByText' to wait for the asynchronous update
        // 'findByText' will wait for up to 1 second for the element to appear
        const userNameElement = await screen.findByText(`User: ${mockUserData.name}`);

        // Assert that the element is now in the document with the mocked data
        expect(userNameElement).toBeInTheDocument();

        // Optional: Verify that fetch was called correctly
        expect(fetchSpy).toHaveBeenCalledTimes(1);
        expect(fetchSpy).toHaveBeenCalledWith('https://api.example.com/user/1');
    });

    // --- Test Case 2: Failed Data Fetch ---
    test('displays an error message when the API call fails', async () => {

        // Implement the mock behavior for 'fetch' to simulate a failure
        fetchSpy.mockImplementation(() =>
            // Simulate the network request itself failing (e.g., connection issue)
            Promise.reject(new Error('API is down'))
        );

        render(<DataFetcher />);

        // Use 'findByText' to wait for the error state update
        const errorElement = await screen.findByText('User: Failed to load user.');

        // Assert that the error message is displayed
        expect(errorElement).toBeInTheDocument();
        expect(errorElement).toBeInTheDocument();
    });
});