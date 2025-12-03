import React, { useState } from 'react';
import OnboardingModal from '../../components/(home)/OnboardingModal';
import { useUser } from '../../hooks/useUser';
import { useSelector } from 'react-redux';

export default function Home() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const { user, loading, error } = useUser();
    const token = useSelector((state) => state.login.token);

    const needsOnboarding = user && (!user.data.specialities || user.data.specialities.length === 0);

    const handleOnboardingComplete = () => {
      setShowOnboarding(false);
      console.log('User completed onboarding!');
    };

    if (loading) {
        return <div>Loading user...</div>;
    }

    if (error && token) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div className="container">
                <div className="home-content">
                    <h1>Welcome, {user?.name || 'Doctor'}!</h1>
                    <p>Home Page Content</p>
                    <p>Your main application content will appear here.</p>
                </div>
            </div>

            <OnboardingModal 
                isOpen={needsOnboarding} 
                onClose={handleOnboardingComplete} 
            />
        </div>
    );
}