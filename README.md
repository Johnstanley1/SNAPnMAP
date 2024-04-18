# Image Catalogue Mobile App

## Overview
This Angular-based mobile app allows users to capture photos with their device's camera, store them in the app's database, add geolocation information to the images, view them in a catalogue format with location-based mapping, and internet connectivity confirmation.

## Features
- Capture photos using the device's camera
- Store images in a database
- Add tags to images
- Fetch and display the user's current location using geolocation
- Display images in a catalogue format
- Show location-based mapping for each image
- Search functionality to find images by tags or location
- Maintain a private list of images, accessible via passcode authentication
- Create collections and add photos to the collection
- Determine when a user is online or offline

## Menu/Navigation (Minumum: 4, Full Marks 7+)
*Because it's a mobile app, we should LOCK the navbar to the footer, and make it present on every page (similar to social media navbars at the bottom)* \
*5 Navigations at the bottom, "Camera" button circular and in the middle* 
- Photos
- Collections
- Camera 
- Hidden Photos
- Settings
- Plus many more Add/Modify Pages, for all Objects

# Pages
- Photos
    - List of all photos
    - Utilize Bootstrap5 'Card' to display photos in Display-Block
    - Each photo has onClick() function to view details
    - 'Add Photo' button at the top left to add a new photo from the library/camera
    - does NOT display photos with 'Hidden: True' value
    - Can filter only to show photos with a 'favourite' tag
    - Can order photos Alphabetically, By Date Added, or by Date Taken (Ascending and Descending)
- Add Photo
    - Form with validation
    - Add name, desc, tags, etc.
    - View the location where the photo was taken
- Collections
    - List of all collections
    - Use bootstrap5 'card' to display collections in display-block
    - The collection icon used in 'card' is "Thumbnail" image datatype
    - Each collection has onClick() function to view collection photos
    - '+' icon top right to navigate to add new collection page
- Add Collection 
    - Form with validation
    - Add name, thumbnail, desc, etc.
- Camera
    - Takes a photo, then uses that data in the 'add new photo' page
- Hidden Photos
    - Password locked
    - shows all photos with 'Hidden: True' value
- Settings
    - Clear DB
    - Add/Remove Tags
    - Change Private Photo Password


# Forms (Minumum 2, Full Marks 3+ With Validation)
- Add Collection (Validation: Name (Required 3-15), DateCreated (Req, Not Future))
- Add Photo (Validation: Name (Req 3-15), DateCreated (Req, Not Future))
- Add Tag (Validation: Name(req 3-15))

# Advanced Features (Max Marks: Both Geo and Camera)
- Utilize Geolocation to Show photos on a map (HARD)
- Camera used to take and add new photos to the library

# Database Schema (Minumum 2 Stores, Full Marks 3+ Significant):
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
    Thumbnail: Image
	Photos: Image[] \
	Date Created: DateTime \
	Description: String \
}

Tags{ \
    Id: int \
    Name: string \
}

## Technologies Used
- Angular
- Typescript
- Node.js
- Html
- Bootstrap
- CSS

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Authors
- Will Smith
- Johnstanley AJagu


