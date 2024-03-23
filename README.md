# url-shortner
Our url-shortner will simply take in a URL which is arbitrarily long and shortens it to look so small so it can be shared easily.
<br>
## The logic behind our URL shortener is as follows:
- User pastes in an arbitrarily long URL to shorten.
- We send the long URL to the server which stores the long URL into a database along with a short unique id to identify the URL ( this id is randomly generated and is usually not more than 7-8 characters long).
- The shortened URL will be our website address with the unique id that looks something like so: ``` ajsite.com/4FRwr5Y ```.
- When the user navigates to the shortened URL, we extract the unique id from the URL and find in the database which original long URL is associated with that id.
- Finally, we redirect the user to the original URL from the database
