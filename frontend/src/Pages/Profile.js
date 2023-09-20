import React from 'react';
import ProfileSettings from '../Components/ProfileSettings';
import CardProfile from '../Components/CardProfile';

function Profile() {
    return (
        <div>
            <CardProfile></CardProfile>
            <h2 className="mb-3">Modifica Profilo</h2>
            <ProfileSettings></ProfileSettings>
        </div>
    );
}

export default Profile;