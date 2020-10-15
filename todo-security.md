# TODO: Security



## **React provides its own security measures.**

No matter how secure a React web application is built, there are chances for it to get exposed to Cross Site Scripting \(XSS\) vulnerabilities over time.

 XSS attacks indicate malicious code being injected into your React application.



## **How  and why would we want to circumvent the built in React security?**

Say a client has an API that returns a bunch of HTML again this is not ideal,  **but it could happen. here we would have to use dangerouslySetInnerHTML to make sure we can map it into our frontend.** 

> **The above would not be as dangerous as allowing tags, or having no clientside or serverrside validation.**

## TODO: Implemented security measures

### 404 for unauthorized users

> Here are some of the security considerations taken during development of this project.
>
> 404 page for unauthorized users
>
> It is important to be diligent that if a client or an authorized user makes a server request, the authentication of your web app should lead to a 401 status error page.

```text

```

## TODO: API Security



Lack of authentication or business logic flaw leads to React API vulnerability.

Some of the common React API attacks are Man In The Middle \(MITM\) or Cross-Site Scripting \(XSS\) and SQL injection \(SQLi\).

Here’s how one can reduce or eliminate React API security failures:

* Validate API call commands against its respective API schemas
* Perform timely schema validations to prevent malicious code injections and security parser attacks
* Double-check that your application is secured with SSL/TLS encryptions

## TODO Avoiding DDOS 

Captcha implementation

```text

```

## Securing against XSS

Client side validation

Server side validation

