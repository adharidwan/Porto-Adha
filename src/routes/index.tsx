import { createFileRoute } from '@tanstack/react-router'
import { styled } from '@linaria/react'

const Title = styled.h1`
  color: hotpink;
  font-size: 3rem;
`

export const Route = createFileRoute('/')({
  component: () => <Title>Hello</Title>,
})