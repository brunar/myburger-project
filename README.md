# Burger Builder Project
To see the project [React Burger Builder](https://www.brunajs.com/view/react-burger/)



# Testing
## Packages: Jest / Enzyme / React Test Renderer

Jest is alredy installed by the react package

```sh
yarn add enzyme react-test-renderer enzyme-adapter-react-16
```

## Enzyme Package 
Allows us to just render component standalone independent of the entire react application and write unit tests, isolated tests, tests where we don't need to render the complete react app.


## Methods to define the test:

### Describe Method
 describe() is a function that takes 2 arguments:
1. description of the test bundle, what will show in the console output
2. testing function, normal javascript function use an ES6 arrow function

3. it() is a function that takes 2 arguments:
4. description of the test bundle, what will show in the console output
5. testing function, normal javascript function use an ES6 arrow function
6. wrapper = shallow()
7. expect(wrapper.find().utility-method-jest())

```jsx
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ComponentTest  from './component-to-be-tested';
import ComponentTestNested  from './component-nested-of-describe-component';

configure({ adapter: new Adapter() });

describe('description item test', () => {
    it('description el inside item test', () => {
        //Important to pass jsx to the shallow Method
        const wrapper = shallow(<ComponentTest />);
        //Inside find() is not a jsx element. It's a exported function from the import of the top
        expect(wrapper.find(ComponentTestNested)).toHaveLength(2);
        //.find(), .contains() - method from Enzyme enzyme to test for different things combined with a new method from jest .toEqual()
    })
})
```

The expect() method is made globally available by jest.
Inside expect, we define our, the thing we want to check so here I want to check if the wrapper contains a certain element.

##### These are utility methods made available by jest
- toHaveLength()


Enzyme API: [http://airbnb.io/enzyme/docs/api/](http://airbnb.io/enzyme/docs/api/)

Jest Docs: [https://facebook.github.io/jest/](https://facebook.github.io/jest/)

### Testing Reducers
Don't even need enzyme because we're not testing any react components, we don't need to render anything, we just test normal javascript code, we test functions, the reducer function. 


# Redux Saga
An alternative of redux-thunk to handle asynchronous actions like reaching out to a server.

Redux Thunk  is a package which allows us to create action creators where we run the asynchronous code and where we then dispatch other actions.

Now redux saga is a package which follows a different approach of working with asynchronous code and it doesn't mix it with the act of dispatching actions.

#### Install Package
```sh
yarn add redux-saga
```
Example JSX
```jsx
import { put } from 'redux-saga/effects';

import * as actionsTypes from '../actions/actionTypes';

// generator function from Next js Generators - function*

// in a generator should prefix, prepend each step we execute with the yield keyword
// This means that this step should be executed and then it will wait for it to finish
// so if it were an asynchronous action, it wouldn't continue before the step is done
function* logout(actions) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put({
        type: actionsTypes.AUTH_LOGOUT
    });
}
```