import React from 'react';
import ProfileSettings from '../Components/ProfileSettings';
import CardProfile from '../Components/CardProfile';

function Profile() {
    return (
        <div className="mt-3">
            <CardProfile></CardProfile>
            <h2 className="mb-3">Edit Profile</h2>
            <ProfileSettings></ProfileSettings>
        </div>
    );
}

export default Profile;