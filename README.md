# Neuraspace Frontend challenge :rocket:

## Notes and Explanations

Hello, just wanted to give you a little bit of context on the idea behind this.

You will see a design-system folder, this folder ultimatly would be imported as an npm module and holds the primitives for the ListItem and ListComponent.
The primitives are built taking advantage of children api in order to be able to compose and reuse them as much as it could.

On the components folder you will find the actual components that would be used inside the project extending the primitives ones.

I removed an unnecessary useCallBack hook inside the home. In my opinion is not necessary for a couple of reasons:
First => without the useCallBack the javascript garbage collector will clean up the old function initialization and construct a new one
Second => useCallBack and useMemo comes with a price. Memoization means caching and means that object must be stored in memory for future references, if you're not doing heavy 
calculation is not needed and performances might be worse
Third => useCallBack without the React.Memo component is not very usefull, if you want to prevent unnecessary rerender you should use it
in conjuntion with React.Memo

I've added useCallBack and useMemo inside the Context, for this example is not necessary but if in the future the Context will stay under a different tree path the parent 
rerender will cause the Context to rerender and all the children with it. To optimize the context could be splitted in two ( one for the setter and another for the 
state value) or you can read the value from the component and then React.Memo the return of the component to avoid unnecessary rerender.

I've added just a test case on the search functionallity because it was explicitly asked so, i'm testing that the function that calls the api will be called 
with the right parameters (as the search value)

I removed the search button as in my opinion was not needed

I'm using suspense and i'm letting react-query throw a promise in order to display a fallback and suspend the ListComponent render until the data
is there. We could also wrap it with an error boundary to catch errors.
I'm using useDeferredValue in order to better the user experience, calling the search without interrupting the input field experience.
I'm also using startTransition so react will try to render the new list but will wait until the promise is fullfilled. React will do this in the background
keeping the previous list on the screen. This will help performance and will also avoid to write a better loader with a fixed height to avoid page jumps.
To give a feedback to the user i'm using the pending value to increase the opacity on the page.

I didn't care much about ui as it was not required and i focused only on the functionalities.
