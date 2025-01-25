
import React from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
class Maps extends React.Component {
  render() {
  

    // Check if google is defined
    if (!google) {
      return <div>Loading...</div>; // Or any other loading indicator
    }

    return (
      <Map
       google={this.props.google}
         
        style={{ width: '100%', height: '100%' }}
        zoom={60}
        initialCenter={{
          lat:12.990836,
          lng: 80.232988,
        }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBkMlyk3SgTFmxagWgjVD_ucH7aNNXNVhk',
})(Maps);
