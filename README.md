# ISAAC assignment

### Building and running the application
In order to run and build the application in a production setting you have to execute the following commands:
```
npm run build
serve dist
```
There is a possibility that you have to install `serve`, this can be done using `npm install -g serve`.

### Lighthouse score
After running the application in production mode I got the following scores:
![Lighthouse performance](https://i.imgur.com/ISfrhJO.png)
Then after some minot tweaking I got it fully performance optimized, according to Lighthouse:
![Lighthouse performance](https://i.imgur.com/2ixajxw.png)

### Wave accessibility
After processing several errors I ended up with the following summary:
![Wave tool](https://i.imgur.com/OExrE2q.png)
