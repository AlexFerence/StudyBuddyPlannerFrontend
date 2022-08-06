![WhiteText](https://user-images.githubusercontent.com/40876788/183257624-1c9b3c8e-83e2-475c-8305-d5d3bc29772b.png)

# Table of Contents
[1 Product Gallery](#Product-Gallery)  
[2 Technical Specifics](#Technical-Specifics)  
[2.1 Technical Diagrams](#Technical-Diagrams)  
[2.2 Swagger Screenshots](#Swagger-Screenshots)  
[3 Business Case](#Business-Case)  
[3.1 Video Pitch](#Video-Pitch)  

# Overview

We created a web application that solves two problems for students. Primarily, it allows students to stay connected with their friends while studying from home through online schooling, and secondly, provides a tool that will analyze their study habits to improve their productivity.

Students were forced to study remotely through COVID. With StudyBuddy, we hoped to create a virtual library environment, where students can see when their other friends are actively studying, and the courses that their friends are taking. Moreover, solutions are provided for students to stay on track through the semesters, as it was challenging for most with online school.

# Product Gallery
Below is a gallery of some images and videos of the hosted web application.


The images below shows the dashboard along with the friends tab. The dashboard would provide analytics for all students on their studying, and a mechanism for them to start a study session using the quick timer. The friends tab would display their list of friends on the application, and show when their friends were last studying, or if they are actively studying.

The second image shows the tasks tab. This is where students could create tasks, see the sessions they have worked on each task, and start a time for their specific tasks if they wish. The time spent on their tasks would then be factored into the dashboard analytics shown above.

 ![dashboard](Images/laptopDashboard.png) | ![tasks](Images/laptop2.png)
 --- | ---


The video below runs through the view one may see when accessing the web application from mobile. The front end (within a seperate repo) was designed to accomodate varying screen sizes. All data is dynamically pulled from the backend using JSON routes.

<p align="center">
<img src="Images/Gif1LandingVideo.gif" width="300">
</p>

Finally, below we see the feed. This would allow users to see their study streaks and milestones, along with those of their friends. 

<p align="center">
<img src="Images/Feed.gif">
</p>


# Technical Specifics
The backend was coded in C#, using DotNetCore. Classes were broken up based on the database structure, whereby each object would correspond to a data table in the mySQL database. Each of these classes would offer a CRUD stack along with listing methods.

The file structure of the API was broken up into 3 layers. The controller layer, the domain layer, and the data access layer. The data access layer would purely be responsible for data retrieival, and would contain the sql statements that would be passed into the database. The domain layer would be the communication point between stacks. For instance, if another stack (for instance the charting service) required information from other data tables, the communication would be done on the domain layer. Finally, the controller layer would surface all routes that would be available to the front end. This layer would also be responsible for all logic surrounding the swagger, and any authorization flags that would be reuqired to call each respective route.

## Technical Diagrams
To better illustrate the technologies used in this API, the following diagrams were created to communicate some key components of the design:

### Tech Stack
The first diagram, shown below, illustrates the entire tech stack of the application. It shows all languages and services used for the implementation, for both the front end (seperate repo), and back end (the current repo).

![Tech Stack](Images/TechStack.png)

### Class Diagram
The following diagram, is a class diagram. The API is far too large to include the specifics of every stack. Therefore, this diagram illustrates one section of the API. it shows the relation between UserProfiles, Subjects, and Tasks. 

![Class Diagram](Images/ClassDiagram.png)

There are a few key takeaways from this diagram. Namely:
* The data flows from parent to child object, along the domain layer. This avoids circular dependencies.
* Interfaces are used to expose the correct methods at each level.
* Classes are mirrored at every level of depth, and the mapping interface provides communication between each level. This leads to better data protection.

### Stripe Integration Process Flow
There were many integrations used in the implementation of this API. Most notably, a key integration was with Stripe to help serve the premium user functionality. As a startup, my co-founder and I were uncomfortable storing sensitive credit card information and user data in our local database. The effort that would be spent to ensure security was not time best spent.

Thus, we decided to leverage Stripe's open API and services to store sensitive user billing data, for those who wished to sign up for premium features. The process flow diagram illustrates a low fidelity flow of the integration. The flow shows two key processes: the creation of the user database rows and how the the foreign keys are stored, along with the initialization of a subscription itself.

![Stripe Process Flow](Images/StripeProcessFlow.png)

### AWS Infrastructure
AWS was used to host both the backend and front end deployments.
* Route 53 was used as the DNS web service to handle incoming requests from the internet and client. All CNAME records would be defined here, and any routing specifications.
* An automatic load balancer is then used to handle requests to the EC2 instance. given our size, the EC2 instance was never upgraded, and more were never added. If usage increased past a certain point, more EC2 instances would've been added, and the ALB structure would've accomodated for that.
* The EC2 was used as the cloud computing platform. With remote desktop, I was able to enter the EC2 instance and deploy both the backend and frontend repos to be hosted.
* Finally, all the prod data was stored in an RDS.

The full diagram can be seen below.
![AWS Structure](Images/AWSStructure.png)



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
