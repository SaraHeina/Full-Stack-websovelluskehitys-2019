import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'


test('renders title, author and likes', () => {
  const sblog = {
    title: 'render',
    author: 'testaaja',
    url: 'www.test.fi',
    likes: 3
  }

  const component = render(
    <SimpleBlog blog={sblog} />
  )

  expect(component.container).toHaveTextContent('render')
  expect(component.container).toHaveTextContent('testaaja')
  expect(component.container).toHaveTextContent('blog has 3 likes')
})

it('clicking the button 2 times calls event handler twice', async () => {
    const sblog = {
        title: 'render2',
        author: 'testaaja2',
        url: 'www.test.fi',
        likes: 3
    }
  
    const mockHandler = jest.fn()
  
    const { getByText } = render(
      <SimpleBlog blog={sblog} onClick={mockHandler} />
    )
  
    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })