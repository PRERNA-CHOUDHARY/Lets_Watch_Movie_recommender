<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/170736084-ec2217d5-8ac6-454f-8eef-a93a28136ef0.png" alt="FRONTEND BANNER" />
</p>

## Website

<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/170779500-189b1441-69d9-4cd1-a393-a0d78ebe565d.png" alt="WEBSITE" />
</p>

**Let's Watch** has a React-based website designed using Tailwind CSS. It has an integration of Google Firebase for authentication. Alan AI also features its voice assistant capabilities & users can know more about the website by directly asking Alan.

When a  user searches for a movie, the `movie_name` reaches the server that returns the recommendations. Using the local storage of the browsers, we can track the search history of the users.

## Firebase Authentication

<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/170775834-40172c4e-fa4b-4b4a-8b53-894e946496c4.png" alt="FIREBASE AUTH" />
</p>

The website is integrated with **Google Firebase for Authentication**. Users can create their accounts & login using email IDs and password. They can change their password using a `reset link` which is provided by Firebase.

You can setup the **Google Firebase Authentication** in the `/FRONTEND` by creating a `.env.local` file with all the necessary details,

```
REACT_APP_FIREBASE_API_KEY             = <Your API Key>
REACT_APP_FIREBASE_AUTH_DOMAIN         = <Your Auth Domain>
REACT_APP_FIREBASE_PROJECT_ID          = <Your Project ID>
REACT_APP_FIREBASE_STORAGE_BUCKET      = <Your Bucket Storage>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = <Your Messaging Sender ID>
REACT_APP_FIREBASE_APP_ID              = <Your App ID>
```

## Alan AI

<p align="center">
  <img src="https://user-images.githubusercontent.com/77505989/170778372-f1558ca8-aeca-468a-af3a-27efc0faff18.png" alt="WEBSITE" />
</p>

Alan is an end-to-end conversational AI platform to build robust and reliable in-app voice assistants and chatbots. There is no need to create spoken language models, train the speech recognition software, deploy and host voice components — the Alan AI backend does the bulk of work.

You only need to install `Alan AI's SDK` and integrate **Alan Button** in your website using this function,

```
useEffect(() => {
        alanBtn({
            key: "df5e0a87ce4cf578d610608f6aad42102e956eca572e1d8b807a3e2338fdd0dc/stage",
            onCommand: (commandData) => {
                if (commandData.command === "command") {
                    // Call the client code that will react to the received command
                }
            },
        });
    }, []);
```

## Working

To run the website, `cd` into `/FRONTEND` and, run the command to install the dependencies,

```
>>> npm install
```

It will install all the dependencies required for the website to function properly. Then,

```
>>> npm start
```
