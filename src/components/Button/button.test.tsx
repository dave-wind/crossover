import React from 'react'
import { render } from '@testing-library/react'
import Button from '.'

describe('test Button Component', () => {
    it('render default button', () => {
        const wrapper = render(<Button>Test</Button>)
        const element = wrapper.getByText('Test')
        expect(element).toBeInTheDocument()
        expect(element.tagName).toEqual('BUTTON')
    })
})