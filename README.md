# Burger Builder Project
Click to see the project [React Burger Builder](https://www.brunajs.com/view/react-burger/)


## Testing Packages: Jest / Enzyme / React Test Renderer

Jest is alredy installed by the react package

```sh
yarn add enzyme react-test-renderer enzyme-adapter-react-16
```

### Testing - Enzyme package 
Allows us to just render component standalone independent of the entire react application and write unit tests, isolated tests, tests where we don't need to render the complete react app.


### Methods to define the test:

#### Describe Method
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
    })
})
```

The expect() method is made globally available by jest.
Inside expect, we define our, the thing we want to check so here I want to check if the wrapper contains a certain element.

##### These are utility methods made available by jest
- toHaveLength()
