# pastTents

Hi, and welcome to Past Tents, a campsite review site created by Team CamAnda.

Technologies Used<br/>
HTML, CSS, Bootstrap, JavaScript, jQuery, Node, Express, MongoDB

Installation Instructions<br/>
Many npm packages were used for this app. Please install the following packages using the command npm install *package name*

body-parser<br/>
ejs<br/>
express<br/>
express-session<br/>
formidable<br/>
fs<br/>
method-override<br/>
mongoose<br/>
mongoose-findorcreate<br/>
passport<br/>
passport-google-oauth<br/>
passport-local<br/>
passport-local-mongoose<br/>
request<br/>

A few other npm packages are listed as dependencies in package.json, but were not used in the application. Installation of the following is not required:

bcrypt<br/>
mongoose-file<br/>
morgan<br/>

Approach Taken<br/>
Team CamAnda wanted to develop a website on a common interest, so we picked camping. At first, we only had models for users and campsites. We thought reviews would be part of the user model. However, we then decided reviews had enough info to be their own model. We limited the models so that you could only create a review after a campsite had been created. This was for data integrity, as people could possibly spell location names incorrectly and suddenly a review isn't showing up on a campsite page! From a user's view, there is a drop-down to pick the campsite you wish to review on new review. We added login after we had our main routes set up. We also added authentication with Google. 

Unsolved Problems<br/>
We really wanted users to be able to upload photos. We did get a file upload to the server working (visit /upload). However, we wanted the user photos to show on the campsite page. We did not have enough time to get the photos into the database. Next time, we will explore GF Grid.

User Stories

1. User can log in
2. User can logout
3. User can login with Google
4. User can create a new campsite
5. User can view a list of created campsites
6. User can view each created campsite individually
7. User can edit a campsite
8. User can create a new review for an existing campsite
9. User can view a list of all created reviews
10. User can view each review individually
11. User can edit a review
12. When a user views a selected campsite, all the reviews for that campsite will show below the campsite information