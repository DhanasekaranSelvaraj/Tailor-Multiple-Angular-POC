This project is just to demonstrate microfront end architecture using [Tailor](https://github.com/zalando/tailor)

**Applications used:**

1. Portal - Tailor
2. Child App 1 - Angular (v7 - 7.0.4)
3. Child App 2 - Angular (v7 - 7.0.4)
4. Child App 3 - Angular (v6 - 6.1.10)
5. Child App 4 - Angular (v6 - 6.1.10)

**How To Use:**

1. Clone the project from [Tailor Multiple Angular POC](https://github.com/DhanasekaranSelvaraj/Tailor-Multiple-Angular-POC)
2. Run `npm install` in main folder.
3. Go to child-apps folder and run `npm install` inside each angular apps
4. Come back to main portal folder and run below commands in different terminals.
    1. `npm run start` - It will start the main application in `http://localhost:9090`
    2. `npm run start-fragments` - It will start individual applications as fragments in `http://localhost:5050`,`http://localhost:5051`,`http://localhost:5052`,`http://localhost:5053` respectively

**Known Issues:**
1. Unable to render two individual angular applications with same versions(*ng build*) in a same window because of some global scope conflicts (It loads only one application which loads first)
2. Unble to render multiple version of angular apps(*webpack build - refer webpack.config.js inside child apps*) with (v7 - Lazy loaded Module) and (v6 - Lazy loaded Module)
[Lazy Load Error](./issues/lazyload_issue.PNG)
3. Angular application works well with custom webpack config(*webpack.config*) and default angular config(*angular.json*) as well in JIT (V6) but (v7) have some conflicts with `@ngtools/webpack`, 

But at the same time following scenarios are working fine:

1. Able to render two angular applications with same versions in a same window (*webpack build - refer webpack.config.js inside child apps*)

2. Able to render two angular applications(v7) with lazy loaded modules.
`
    <fragment src="http://localhost:5050"></fragment>
    <fragment src="http://localhost:5051" ></fragment>
`
3. Able to render two angular applications(v6) with lazy loaded modules.
`
    <fragment src="http://localhost:5052"></fragment>
    <fragment src="http://localhost:5053" ></fragment>
`
4. Able to render multiple version of angular apps with (v7 - Lazy loaded Module) and (v6 - Normal Modules)
5. Comment the fragment urls in index.html respectively and run `npm start` to check the above scenarios.
