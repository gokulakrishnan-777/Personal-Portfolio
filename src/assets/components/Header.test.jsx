import { render, screen } from '@testing-library/react';
import Header from './Header';
import { themeContext } from '../context/themeApi';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
};

describe('Header Component', () => {
    it('renders the header logo correctly', () => {
        const mockTheme = {
            theme: 'light',
            setTheme: jest.fn()
        };

        render(
            <themeContext.Provider value={mockTheme}>
                <Header />
            </themeContext.Provider>
        );

        // Check if the logo "G" is rendered
        expect(screen.getByText('G')).toBeTruthy();
        
        // Check if the navigation items are rendered
        expect(screen.getByText('Home')).toBeTruthy();
        expect(screen.getByText('About')).toBeTruthy();
        expect(screen.getByText('Project')).toBeTruthy();
    });
});
