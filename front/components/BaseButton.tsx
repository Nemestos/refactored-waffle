import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  border-radius: 8px;
  padding: 20px;
  font-size: 30px;
  font-weight: bold;
  font-family: sans-serif;
  color: red;
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  text-shadow: 0px 4px 3px #463e3e, 0px 8px 13px #cacaca18, 0px 18px 23px #b9b9b91d;
`

export interface BaseButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const BaseButton: React.FC<BaseButtonProps> = ({ children, className, onClick }) => (
  <StyledButton onClick={onClick} type="submit" className={className}>
    {children}
  </StyledButton>
)

export default BaseButton
