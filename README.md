# Neuraspace Frontend challenge :rocket:

## Introduction

This is a simple React webapp that displays a list of space-related news.

It retrieves data from SpaceDev's API (https://www.spaceflightnewsapi.net/ / https://api.spaceflightnewsapi.net/v3/documentation) and uses MUI as an UI framework (https://mui.com/)

The goals for this challenge are to assess your familiarity with React in general, code structure/organization and unit testing.

## What we value

The objective of the test, from a coding perspective, is that you code is as next to
production code as possible. It should be properly documented, with tests, and ready to be used. If
you need to trade-off between adding nice-to-haves for production readiness, go for production
readiness. The result of this exercise doesn’t need to be big. It needs to reflect what you believe
production-like quality looks like.

# The challenge

## Task 1 - Code structure

The project's source code is lacking some structure which tipically hinders the team performance and code maintainability down the road.

Your first task is to refactor/restructure the source code as if this was a production app.

You'll be asked to comment on your decisions in regards to how the code structure:

-   helps the team scale
-   enforces consistency and clarity
-   promotes a good separation of concerns

## Task 2 - Implement a feature

After you run the app, you'll notice that there is a pagination placeholder above the articles list.

The goal is for you to implement pagination for this list.

You'll need to check the API documentation to figure out how pagination is done on the API side.

MUI's [TablePagination](https://mui.com/material-ui/api/table-pagination/#main-content) component can be used to help speed things up

```jsx
<TablePagination
    count={100}
    page={0}
    rowsPerPage={10}
    onPageChange={() => {}}
/>
```

Feel free to use more feature-rich HTTP libraries like [react-query](https://react-query.tanstack.com/) or [swr](https://swr.vercel.app/);

The main goal of this task is to assess the familiarity with REST APIs and the overall knowledge of React hooks like useState, ...

## Task 3 - Fix a bug

For some reason, the search functionality isn't working. E.g. if someone searches for "Nasa", the articles aren't filtered.

This task is comprised of 2 parts:

-   Fix the bug :)
-   Write a unit test that prevents this bug from happening again

## Task 4 - Handle global state

Lastly, we want to let a user star/unstar articles.

Here are the requirements for this feature:

-   The list of starred articles should be persisted (reloading the page should preserve the starred list). Local storage is acceptable
-   Each article card should have a toggle that the user can click to start/unstar an article
-   On the topbar, there should be a component that displays the number of starred articles

The goal for this task is to assess your familiarity with state management. We value the use of React's ContextAPI higher than state management libraries (e.g. Redux).

## Getting started

_This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)._

Click the "Use this template" button and create a repo on your user space.

After you clone the repository, in the project directory, run:

-   `npm install`
-   `npm start`

That's it, you're set.

# Good luck :raised_hands:
