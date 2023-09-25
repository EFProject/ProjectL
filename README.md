# 🎯 OneSport

<br/>

# 🏆 Team Members

```
Andrea Panceri 1884749

Francesco Sudoso 1808353

Valerio Francione 2047712

Eugenio Facciolo 2065516

Francesco Sasanelli 2014433
```

# ❓ Main Idea

OneSport is dedicated to offering up-to-date and pertinent information on a wide range of sports and athletic events. Our primary aim is to keep fans and enthusiasts well-informed and engaged. The project strives to serve as a one-stop destination for comprehensive sports news, event updates, and a convenient platform for purchasing tickets to various sporting events.

# 👤 User Stories

#TODO - FRANCESCO

EXAMPLE:

1. I want to see my current shopping cart
2. I want to order the products for ascending/descending price

As a Merchant:

1. I want to insert/remove products
2. I want to change the price of a product

# 🆔 Entities

There are basically four entities in the system:

- **_User_**: handle the authentication, he can add, remove or modify users in the system.
- **_News_**: can look for recent news, save them if interested, and can also delete or update saved news.
- **_Tickets_**: is responsible for searching and managing ticket-related operations. It acts as the intermediary between users and event tickets. Users can utilize this feature to search for available tickets for various sporting events and make purchases. A ticket can be collected, also deleted and updated.
- **_Friends_**: it is responsible for all the actions realted to the friend section, like creating request but also accept or refuse it. It play a crucial role in the system.

## 📁 Components

- **_News service_**: microservice that handles the news of the site.
- **_Tickets service_**: microservice dedicated to handle the management of the tickets.
- **_Friends service_**: microservice for creat connections between users.
- **_Authentication service_**: microservice that handle authentication of the user, and all the management of his informations.
- **_Database_**: database to store data related to the system.
- **_News Interface_**: interface that allows the communication between the news client and the news service
- **_Tickets Interface_**: interface that allows the communication between the ticket client and the ticket service
- **_Friends Interface_**: interface that allows the communication between the friends client and the friends service
- **_Authentication Interface_**: interface that allows the communication between the client and the authentication service

# 🏬 Architecture

<div>
   <img src="images/architecture.png" width=60% style="display:inline-block; margin-right: 2%;"/>
</div>

## 🔐 DB Structure

**_user_**:
| **_id_** | name | email | role | password |
| --- | --- | --- | --- | --- |

**_news_**:
| **_id_** | title | author | urlToImage | urlToImage | user_id | url |
| --- | --- | --- | --- | --- | --- | --- |

**_tickets_**:
| **_id_** | name | info | promoter | urlToImage | localDate | user_id | url |
| --- | -------- | ---------- | -------- | ----- | ----- | ----- | ----- |

**_friends_**:
| **_id_** | user_id | friend_id | status |
| --- | --- | --- | --- |

## 📝 Authentication api documentation

- GET /users/

Returns all the users of the application.

- GET /users/[user_id]

Returns the user with ID=[user_id].

> Example: <authentication_service_url>/user/1
> Gets the user with ID=1

- GET /users/get_by_email/[email]

Return the user with the email=[email].

- GET /users/checkToken

Check if the current user has a valid token, or it is expired.

- POST /users/login

Handle the login for the current user, generating as response a token.

Format of json body:
{
"email": "massimo.mecella@uniroma1.it",
"password" = "Laboratorio2023#",
"remember" = true
}

- POST /users/signup

  Create a new user using the inserted information, return a message that confirm the action.

  Format of json body:
  {
  "email": "massimo.mecella@uniroma1.it",
  "name": "Massimo",
  "password": "Laboratorio2023#"
  }

- POST /users/logout

Remove the token for the logged user, and execute the logout from current session, return a confirmation message.

Format of json body:
{
"user_id": 4
}

- PUT /users/[user_id]/edit

Update the information of user with ID=[user_id], and return the json of the updated user.

Format of json body:
{
"email": "massimo.mecella@diag.it",
"name": "Massimo",
"password": "Laboratorio2023%"
}

- DELETE /users/[user_id]

Delete the user with ID=[user_id].

## 📰 News api documentation

- GET /news/

Returns all latest sports news, using an external API, can be applied filters:

- country: The country code where news is to be searched.
- q: A keyword that the news must contain.
- pageSize: The number of results per page.
- page: The desired number of pages for result delivery.

> Example: <news_service_url>/news/?country=IT&pageSize=20&page=4&q=Roma
> Gets all the latest news related to Roma, from Italian sources.

- GET /news/[user_id]

Returns all news saved by user with ID=[user_id].

> Example: <news_service_url>/news/1
> Gets all the saved news by user with ID=1

- POST /news/create

  Save a news for a user, adding also the linked information and return the json of the news created.

  Format of json body:
  {
  "title":"Lukaku scappa, Zapata lo riprende: un punto a testa per Torino e Roma",
  "author":"Gazzetta dello sport",
  "urlToImage":"https://dimages2.gazzettaobjects.it/files/image_618_349/files/fp/uploads/2023/09/24/65109e6a86b68.r_d.1362-736-2270.jpeg",
  "published_at":"2023-09-25",
  "user_id":"4",
  "url":"https://www.gazzetta.it/Calcio/Serie-A/Torino/24-09-2023/torino-roma-1-1-lukaku-scappa-zapata-lo-riprende.shtml"
  }

- DELETE /news/[news_id]

Deletes the news with ID=[news_id].

- DELETE /news/[user_id]/all

Deletes all the news saved by user with ID=[user_id].

## 🎫 Tickets api documentation

- GET /tickets/

Returns all tickets for upcoming events, using an external API, can be applied filters:

- countryCode: The country code where tickets are to be searched.
- keyword: A word related to the desired event.
- size: the size of results.
- page: The desired number of pages for result delivery.

> Example: <tickets_service_url>/tickets/?countryCode=US&size=100&page=4
> Gets all the upcoming events in US, maximum 100 reuslts in 4 pages.

- GET /tickets/[user_id]

Returns all tickets collected by user with ID=[user_id].

> Example: <tickets_service_url>/tickets/1
> Gets all the collected tickets by user with ID=1

- POST /tickets/collect

  Generate the collection of a ticket for a user, adding also the linked information and return the json of the ticket created.

  Format of json body:
  {
  "name":"Portland Trail Blazers vs. Phoenix Suns",
  "info":"Bags and full-length umbrellas are not allowed in the arena. Exclusions apply for medical bags, children's bags and clutches 5X8\" or smaller. Bag check is available.",
  "urlToImage":"https://s1.ticketm.net/dam/a/68b/e6113bdd-2bdf-46d8-bfa9-c32b09b9768b_RECOMENDATION_16_9.jpg",
  "promoter": "GG",
  "localDate":"2023-10-12",
  "user_id":"4",
  "url":"https://www.ticketmaster.com/portland-trail-blazers-vs-phoenix-suns-portland-oregon-10-12-2023/event/0F005F08E2256F5E"
  }

- DELETE /tickets/[ticket_id]/cancel_friend

Deletes the ticket with ID=[ticket_id].

- DELETE /tickets/[user_id]/all

Deletes all the tickets collected by user with ID=[user_id].

## 👥 Friends api documentation

- GET /friends/[user_id]

Returns all friend of the user associeted to [user_id].

> Example: <friend_service_url>/friends/1
> Gets all the friends of user with ID=1

- GET /friends/requests/[friend_id]

Returns all requests recieved by the user associeted to [friend_id].

> Example: <friend_service_url>/friends/requests/1
> Gets all the requests recieved by user with ID=1

- POST /friends/create_request

  create a request of friendship by user [user_id] for another one [friend_id], and return the json of the friendhip created.

  Format of json body:
  {
  "user_id": 2,
  "friend_id": 4
  }

- PUT /friends/[int:request_id]/accept_request

Update the request with ID=request_id, changing status to 'accepted'.

- DELETE /friends/[friend_id]/cancel_friend

Deletes friendship with given id.

- DELETE /friends/[request_id]/delete_request

Deletes request of friendship with given id.
