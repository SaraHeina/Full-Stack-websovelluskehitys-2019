import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

test('blog show only tittle and authour unless you click a button', async () => {
  const blog = {
    title: 'rend',
    author: 'testaan',
    url: 'www.test.fi',
    likes: 3
  }

  const component = render(
    <Blog blog={blog} />
  )

  const comp = component.container.querySelector('.onlyTitle')
  expect(comp).toHaveTextContent('rend')
  expect(comp).toHaveTextContent('testaan')
  expect(comp).not.toHaveTextContent('www.test.fi')
  expect(comp).not.toHaveTextContent('3 likes')
  fireEvent.click(comp)
  const compon = component.container.querySelector('.detailed')
  expect(compon).toHaveTextContent('rend')
  expect(compon).toHaveTextContent('added by testaan')
  expect(compon).toHaveTextContent('www.test.fi')
  expect(compon).toHaveTextContent('3 likes')
})