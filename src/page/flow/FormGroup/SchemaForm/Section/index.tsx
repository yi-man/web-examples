import React, { createContext, useContext } from 'react'
import { usePrefixCls } from './usePrefixCls'
import cls from 'classnames'
import {useResponsiveFormLayout} from './useResponsiveFormLayout'
import { connect, mapProps } from '@formily/react'
import { Typography } from 'antd';

const { Title } = Typography;

export interface IFormLayoutProps {
  label?: string;
  prefixCls?: string
  className?: string
  style?: React.CSSProperties
  colon?: boolean
  labelAlign?: 'right' | 'left' | ('right' | 'left')[]
  wrapperAlign?: 'right' | 'left' | ('right' | 'left')[]
  labelWrap?: boolean
  labelWidth?: number
  wrapperWidth?: number
  wrapperWrap?: boolean
  labelCol?: number | number[]
  wrapperCol?: number | number[]
  fullness?: boolean
  size?: 'small' | 'default' | 'large'
  layout?:
    | 'vertical'
    | 'horizontal'
    | 'inline'
    | ('vertical' | 'horizontal' | 'inline')[]
  direction?: 'rtl' | 'ltr'
  inset?: boolean
  shallow?: boolean
  tooltipLayout?: 'icon' | 'text'
  tooltipIcon?: React.ReactNode
  feedbackLayout?: 'loose' | 'terse' | 'popover' | 'none'
  bordered?: boolean
  breakpoints?: number[]
  spaceGap?: number
  gridColumnGap?: number
  gridRowGap?: number
}

export interface IFormLayoutContext
  extends Omit<
    IFormLayoutProps,
    'labelAlign' | 'wrapperAlign' | 'layout' | 'labelCol' | 'wrapperCol'
  > {
  labelAlign?: 'right' | 'left'
  wrapperAlign?: 'right' | 'left'
  layout?: 'vertical' | 'horizontal' | 'inline'
  labelCol?: number
  wrapperCol?: number
}

export const FormLayoutDeepContext = createContext<IFormLayoutContext>(null)

export const FormLayoutShallowContext = createContext<IFormLayoutContext>(null)

export const useFormDeepLayout = () => useContext(FormLayoutDeepContext)

export const useFormShallowLayout = () => useContext(FormLayoutShallowContext)

export const useFormLayout = () => ({
  ...useFormDeepLayout(),
  ...useFormShallowLayout(),
})

export const FormLayout: React.FC<React.PropsWithChildren<IFormLayoutProps>> & {
  useFormLayout: () => IFormLayoutContext
  useFormDeepLayout: () => IFormLayoutContext
  useFormShallowLayout: () => IFormLayoutContext
} = ({ shallow, children, prefixCls, className, style, label, ...otherProps }) => {
  const { ref, props } = useResponsiveFormLayout(otherProps)
  const deepLayout = useFormDeepLayout()
  const formPrefixCls = usePrefixCls('form', { prefixCls })
  const layoutPrefixCls = usePrefixCls('formily-layout', { prefixCls })
  const layoutClassName = cls(
    layoutPrefixCls,
    {
      [`${formPrefixCls}-${props.layout}`]: true,
      [`${formPrefixCls}-rtl`]: props.direction === 'rtl',
      [`${formPrefixCls}-${props.size}`]: props.size,
    },
    className
  )
  const renderChildren = () => {
    const newDeepLayout = {
      ...deepLayout,
    }
    if (!shallow) {
      Object.assign(newDeepLayout, props)
    } else {
      if (props.size) {
        newDeepLayout.size = props.size
      }
      if (props.colon) {
        newDeepLayout.colon = props.colon
      }
    }
    return (
      <FormLayoutDeepContext.Provider value={newDeepLayout}>
        <FormLayoutShallowContext.Provider value={shallow ? props : undefined}>
          {children}
        </FormLayoutShallowContext.Provider>
      </FormLayoutDeepContext.Provider>
    )
  }
  return (
    <div ref={ref} className={layoutClassName} style={style}>
      <Title level={2}>{label}</Title>
      <div>
      {renderChildren()}

      </div>

    </div>
  )
}

FormLayout.defaultProps = {
  shallow: true,
}

FormLayout.useFormDeepLayout = useFormDeepLayout
FormLayout.useFormShallowLayout = useFormShallowLayout
FormLayout.useFormLayout = useFormLayout

type ComposeFormLayout = React.FC<React.PropsWithChildren<IFormLayoutProps>> & {
  BaseItem?: React.FC<React.PropsWithChildren<IFormLayoutProps>>
}
export const FormLayout1: ComposeFormLayout = connect(
  FormLayout,
  mapProps((props, field) => {
    return {
      label: field.title,
    }
  })
)

export default FormLayout1