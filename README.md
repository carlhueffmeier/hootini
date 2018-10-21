<h1>
<img src="https://user-images.githubusercontent.com/27681148/47261359-d57e2b80-d4cd-11e8-841a-b9352bfce657.png" alt="Hootini" height=24>&nbsp;Hootini&nbsp;
</h1>

Flashcard learning application with a flexible templating engine.

# Idea

Several years ago, I used a Spaced Repetition System to learn Japanese.
It helped me memorize thousands of characters in only a few weeks! And believe me, I don't have a good memory.

And although spaced repetition is a very powerful tool, none of the people I suggested it to would end up using it regularly.

Part of the reason is the complex UI of existing software, which creates a high entry barrier for first-time users.
_Hootini_ is my attempt to create an application that is easy to understand, without being restrictive.

This is what sets _Hootini_ apart:

- ✨ Clean and functional interface
- 🤸‍ Flexible templating engine
- 📖 Markdown support
- 👩‍💻 Code highlighting

# Technologies

- [React](https://reactjs.org/)
- [GraphQL](https://graphql.org)
- [Apollo Client](https://www.apollographql.com/client)
- [Apollo Server](https://www.apollographql.com/server)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

# Showcase

<center>
  <table>
    <tr>
      <td><img width="240" alt="Where you see all your decks" src="https://user-images.githubusercontent.com/27681148/47261409-2cd0cb80-d4cf-11e8-94bc-910026e46c25.png"></td>
      <td><img width="240" alt="This is where you add new cards" src="https://user-images.githubusercontent.com/27681148/47261413-470aa980-d4cf-11e8-9dac-48f1c288124a.png"></td>
    </tr>
    <tr>
      <td><img width="240" alt="The note preview" src="https://user-images.githubusercontent.com/27681148/47261421-686b9580-d4cf-11e8-9b6f-f392438b539f.png"></td>
      <td><img width="240" alt="How it looks during reviews (I'm going to make this more beatiful at some point)" src="https://user-images.githubusercontent.com/27681148/47261427-7e795600-d4cf-11e8-8c1d-093b041e1ea7.png"></td>
    </tr>
    <tr>
      <td><img width="240" alt="Positive Reinforcement (TODO: Add motivational quotes)" src="https://user-images.githubusercontent.com/27681148/47261456-f9db0780-d4cf-11e8-87e8-302eb566ed48.png"></td>
      <td><img width="240" alt="You can add your own note types and add several templates" src="https://user-images.githubusercontent.com/27681148/47261462-1d05b700-d4d0-11e8-99fc-57293c9bdf27.png"></td>
    </tr>
    <tr>
      <td colspan=2><img width="480" alt="The same edit note screen on a desktop" src="https://user-images.githubusercontent.com/27681148/47261512-204d7280-d4d1-11e8-95de-308003e1cbe6.png">
      </td>
    </tr>
  </table>
</center>

# Get started

1. Clone the repository

```sh
> git clone https://github.com/carlhueffmeier/hootini.git
```

2. Install dependencies

```sh
> npm install
```

3. Configure your environment

```sh
> cp client/.env.example client/.env
# Edit client/.env

> cp server/.env.example server/.env
# Edit server/.env
```

4. Run the project

```sh
# Runs both client and server
> npm start

# Starts the client
> npm run start:client

# Starts the server
> npm run start:server
```
