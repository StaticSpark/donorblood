1.Environments
1) node.js v6.10.1+
2) npm	4.4.4+
3) npm install -g @angular/cli@1.0.0
4) mongodb 2.6.10, running at localhost:27017

2.Set up demo
1) Open terminal, cd to "Code" folder, run "npm install"
2) then apply a patch, run "cp patches/FireLoop.js node_modules/@mean-expert/loopback-component-realtime/dist/modules/FireLoop.js"
3) Cd to "Code/client" folder, run "npm install && ng build --env=demo"
4) return back to "Code" folder, run "npm start"
5) In browser, open http://localhost:3000/, you should can view a map

3.Dev,auto recompile,restart,and reloading
1) npm install -g @mean-expert/fireloop@1.0.0-beta.2.4
2) go to "Code" folder, run "fireloop serve"

3.Unit test for API and Web app
Open terminal, cd to "Tests" folder, run "./unittest.sh"
Note: in web app, the unit tests for map and donor components have blocking issues, they are commented out.


