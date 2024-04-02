# Image Catalogue Mobile App

## Overview
This Angular-based mobile app allows users to capture photos with their device's camera, store them in the app's database, add geolocation information to the images, and view them in a catalogue format with location-based mapping.

## Features
- Capture photos using the device's camera
- Store images in a database
- Add tags to images
- Fetch and display the user's current location using geolocation
- Display images in a catalogue format
- Show location-based mapping for each image
- Search functionality to find images by tags or location
- Maintain a private list of images, accessible via passcode authentication


## Menu/Navigation
*Because it's a mobile app, we should set the navbar to the footer, and make it present on every page (similar to social media navbars at the bottom)* \
-> Photos (Plus icon top right of page to add photo)  \
-> Collections (Plus icon top right of page to add collection) \
-> Camera (Take photos, add photo info) \
-> Hidden Photos: Password locked  \

## Technologies Used
- Angular
- Node.js
- Html
- Bootstrap
- CSS

# Database Schema:
Photos: { \
    Name: String \
    Photo: Image \
	Date Captured: DateTime \
	Date Added: DateTime \ 
    Tags: Tags[] \
	Favourite: bool \
	Hidden: bool \
} 

Collection: {  \
    Name: String \
	Photos: Image[] \
	Date Created: DateTime \
	Description: String \
}

Tags{ \
    Id: int \
    Name: string \
}

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Authors
- Will Smith
- Johnstanley AJagu


