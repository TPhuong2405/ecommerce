import React from 'react'
import { Checkbox, Rate } from 'antd';
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'



const NavbarComponent = () => {
    const onChange = () => {};

    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue>{option}</WrapperTextValue>
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <>
                                    <Checkbox value={option.value}>{option.label}</Checkbox>
                                </>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '8px'}}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`tu ${option} sao `}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>
                            {option}
                        </WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

  return (
    <div>
      <WrapperLableText>Label</WrapperLableText>
      <WrapperContent>
        {renderContent('text', ['Tủ Lạnh', 'Điện Thoại', 'Tivi'])}
      </WrapperContent>
      {/* <WrapperContent>
        {renderContent('checkbox', [
            {value: 'a', label: 'A'},
            {value: 'b', label: 'B'},
            {value: 'c', label: 'C'},
            {value: 'd', label: 'D'},
        ])}
      </WrapperContent>
      <WrapperContent>
        {renderContent('star', [
            3, 4, 5
        ])}
      </WrapperContent>
      <WrapperContent>
        {renderContent('price', [
            "Dưới 40", "Trên 50.000"
        ])}
      </WrapperContent> */}
    </div>
  )
}

export default NavbarComponent
