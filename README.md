# Deploy on Heroku

Start by signing up on [Heroku](https://www.heroku.com)

Select _Create a new app_ and in the next screen, choose the name of your app.

It will be the name used in the URL to access your app, so choose wisely!

Also, select _Europe_ as a region.

Go to your _Account settings_ page and add a credit card. It will not be charged, as long as you don't pick any paid add-on.

Go back to your app's overview page and select _Configure Add-ons_, type _MongoDB_ and select _mLab MongoDB_,
with the free Sandbox option.

You need to make sure that you have all the variables that are in your .env are also saved in Heroku, in the _Config Vars_ section of the _Settings_ tab.

So click on the _Settings_ tab and then on the _RevealConfigVars_ tab. There you enter the configuration variables.

When you are running your app in development it is localhost, in production it should be the address that you can get by clicking on the _Settings_ tab and then _Reveal Config Vars_.

You can see there is already a MONGODB_URI variable configured, so just add this to your mongoose connection link wherever you need it in your project:

The MONGODB_URI variable on heroku will look something like this: 
```
mongodb://heroku_s5t34q0n:1hspkmkdnoddpj4tchb01na9ai@ds0345969.mlab.com:29969/heroku_s5t34q0n 
```

And in your project:
```
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/movie-project" ...)
```

(without the ... of course...)
### Possible Problem with the Mongo connection URI

```
2019-07-04T20:56:06.674574+00:00 app[web.1]:     at TCPConnectWrap.afterConnect [as oncomplete] (net.js:1106:14)
2019-07-04T20:56:06.674575+00:00 app[web.1]:   errno: 'ECONNREFUSED',
2019-07-04T20:56:06.674576+00:00 app[web.1]:   code: 'ECONNREFUSED',
2019-07-04T20:56:06.674577+00:00 app[web.1]:   syscall: 'connect',
2019-07-04T20:56:06.674578+00:00 app[web.1]:   address: '127.0.0.1',
2019-07-04T20:56:06.674580+00:00 app[web.1]:   port: 27017 }
```

This means you are trying to connect to MongoDB via localhost. You need to make sure you are using the correct url.

Commit the changes and push to the master branch, this should deploy again.

### Deploy from GitHub
Now, click on the _Deploy_ tab and _Connect to GitHub_.

Select your repo from Github (make sure that your package.json is at the root of your repository) and enable _Automatic Deploys_.

For the first time, select the manual deploy to deploy your master branch.

If there is an error, select _More_ > _View Logs_.

## Connect to a GUI

To visualize your database on Compass or [Studio3T](https://studio3t.com/ironhack) start by copying the MONGODB_URI config variable from the *Settings* tab.

### Compass

You should get a prompt asking if you want to use the URI in your clipboard. Accept and then change the following field: *authentication database* which is set as `admin` and use the value in the *username* field instead.

### Studio3T

Select *Connect*, *New Connection* and *From URI* on the main tab. Just paste the link and you're set up! Next time, just select the connection.