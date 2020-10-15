# Todo Followup: My  Security Bible

## **React provides its own security measures.**

No matter how secure a React web application is built, there are chances for it to get exposed to Cross Site Scripting \(XSS\) vulnerabilities over time.

 XSS attacks indicate malicious code being injected into your React application.

## Library and component security

* Ensure that the components used and their dependencies do not have any security flaw before incorporating into your application
* Conduct manual updates
* Make sure that the old version of any component or library is patched with newer versions

## **How  and why would we want to circumvent the built in React security?**

Say a client has an API that returns a bunch of HTML again this is not ideal,  **but it could happen. here we would have to use dangerouslySetInnerHTML to make sure we can map it into our frontend.** 

> **The above would not be as dangerous as allowing tags, or having no clientside or serverrside validation.**

## Basic mitigation against XSS

_**APIs like createElement\(\)**_ 

help in automatic detection of injection attacks

#### _The power of JSX_ 

can be leveraged in order to secure the application via its auto-escaping functionality

#### Third-party libraries like dangerouslySetInnerHTML

 can be used to set HTML directly from React instead of using innerHTML that is vulnerable to XSS

#### Create automated overseeing features that can sanitize the user input

#### Avoid invalid and malicious user input from being rendered into the browse



**See the below chapter for the implementation of clientside validation**

{% page-ref page="todo-clientside-validation.md" %}

## Basic mitigation against CSRF

**Securing from CSRF attacks is not impossible if follow the below steps:**

Initially, ensure that your application reads only the stored CSRF tokens

Secondly, make sure it generates only relevant headers by making an authenticated request to the server. This might also be known as Cross

**Origin Resource Sharing \(CORS\)**

The final step will be letting the server eliminate all the unnecessary and unauthorized CSRF attacks

{% page-ref page="../api-documentation/apollo-+-graphql.md" %}

## Routing security

### Guarded routes

JWT with React router redirect component to easily implement secured routing of data

### 404 for unauthorized users

> Here are some of the security considerations taken during development of this project.
>
> 404 page for unauthorized users
>
> It is important to be diligent that if a client or an authorized user makes a server request, the authentication of your web app should lead to a 401 status error page.

**See the below chapter for implementations**

## API Security

Lack of authentication or business logic flaw leads to React API vulnerability.

**Common React API attacks are Man In The Middle \(MITM\) or Cross-Site Scripting \(XSS\) and SQL injection \(SQLi\).**

**Validate API call commands against its respective API schemas**

**Perform timely schema validations to prevent malicious code injections and security parser attacks**

**Double-check that your application is secured with SSL/TLS encryptions**

\*\*\*\*

**See the below chapter for implementations**

{% page-ref page="../api-documentation/apollo-+-graphql.md" %}



## **Authentication and Security**

Some of the commonly used React authentication approaches are:

### **JWT's & Firebase.**

The implementation and following technologies are used in this project.

You can also use JWT with React router redirect component to easily implement secured routing of data

> #### An alternative would be to use Passport.js, but since im opting for a BaaS solution i am using firebase here.



### **Encrypting \(Salting and Hashing - Bcrypt\)**

Making sure data  is not stored as plaintext in the backend.



### Avoiding DDOS 

Captcha implementation



### Client side validation 

Here i will use the React Validation Framework which supports the error prop included in material-UI



### Server-Side Validation

Server-side validation implemented into the express API itself.



**see the below chapters for implementations:**

{% page-ref page="../api-documentation/authentication.md" %}

{% page-ref page="todo-clientside-validation.md" %}









