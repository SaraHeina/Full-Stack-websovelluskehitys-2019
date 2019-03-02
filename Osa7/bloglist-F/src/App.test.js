import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'


describe('<App />', () => {

  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(() => component.getByText('kirjaudu')) 
    
    expect(component.container).toHaveTextContent('log in to application')
    expect(component.container).toHaveTextContent('käyttäjätunnus')
    expect(component.container).toHaveTextContent('salasana')
    expect(component.container).not.toHaveTextContent('Cooking')
    expect(component.container).not.toHaveTextContent('token2')
  })

  it('if user has logged in, blogs are rendered', async () => {
    const user = {
        username: 'Alice',
        token: '1231231214',
        name: 'Alice in Wonderland'
      }
      
    localStorage.setItem('loggedUser', JSON.stringify(user)) 
    const component = render(
        <App />
      )
      await component.rerender(<App />)
  
      expect(component.container).not.toHaveTextContent('log in to application')
      expect(component.container).not.toHaveTextContent('käyttäjätunnus')
      expect(component.container).toHaveTextContent('Cooking')
      expect(component.container).toHaveTextContent('O') 
      expect(component.container).toHaveTextContent('blogs')  
  })

})