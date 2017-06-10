# Objective
Develop a single page blood donation management system to facilitate the patients from all around the world,
find blood donors near them.

## Functional Specifications:
The app will provide a bridge between the patients and the volunteer blood donors.
The index page of application would load a map. Preferably it should be navigated to visitors’ location or the
user can use search to navigate.

## For Donors:
Donors can find their location and tap/click on it. On clicking it should open a form in popup, where the
donor can add the following information:

First Name,Last Name,Contact Number,Email Address,Blood Group

All these fields should have proper validation i.e. proper email address and a proper telephone number (+xx
xxx xxxx xxx | 00xx xxx xxxx xxx).

On submitting the form a success message should be shown to user and his information along with his
address, ip and geographical coordinates should be saved in database.

A unique private link should be generated and displayed to him, from where he can edit or delete his posting.

## For Patients:
The map on index page should show all the posts in database as small pins at their respective coordinates.
These pins should be lazy loaded, so only the pins that belong to the visible area of map should be loaded. As
the user navigates the map, more pins should load accordingly.

On clicking any pin, a popup should appear displaying the donor’s information. In place of email and phone
number, there should be a text (click to show). When the user clicks on this text, it should replace with the
respective information. (This is to avoid bots from reading donor’s email address and contact information)

If any pin changes (a user made change to his post or deleted it) The change should be visible real time to
other users.

# Requirements
1. A single page architecture of data driven app, using MEAN stack.
2. Feel free to chose between Angular 2 or REACT as your front end framework.
3. Index page should mainly contain a map using ArcGIS
4. The postings should be real time, using sockets via socket.io
5. MongoDb NoSQL database should be used.
6. Unit tests should be written, where necessary.
