import { useState } from 'react';

export function PlaceholderComponent({ onLoginMethodSelected }: any) {
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSocialLogin = async () => {
    setIsLoading(true);
    try {
      // Handle social login initialization (if needed)
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate loading
      onLoginMethodSelected('social');
    } catch (error) {
      console.error('Social login error:', error);
      // Handle errors appropriately
    } finally {
      setIsLoading(false);
    }
  };

  const handleEthereumLogin = async () => {
    setIsLoading(true);
    try {
      // Handle Ethereum login initialization (if needed)
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate loading
      onLoginMethodSelected('ethereum');
    } catch (error) {
      console.error('Ethereum login error:', error);
      // Handle errors appropriately
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {/* Homepage content */}
      <button onClick={handleSocialLogin} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Social Login'}
      </button>
      <button onClick={handleEthereumLogin} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Ethereum Login'}
      </button>
    </div>
  );
}

