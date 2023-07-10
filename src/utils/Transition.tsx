import React, {
    ElementType,
    FC,
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useRef,
} from 'react'
import { CSSTransition as ReactCSSTransition } from 'react-transition-group'

interface Props {
    show: boolean
    enter: string
    enterStart: string
    enterEnd: string
    leave: string
    leaveStart: string
    leaveEnd: string
    appear: string
    unmountOnExit?: boolean
    tag: ElementType
    className?: string
    children: ReactNode | ReactElement
}

const TransitionContext = React.createContext({
    parent: {
        show: false,
        appear: '',
        isInitialRender: false,
    },
})

function useIsInitialRender() {
    const isInitialRender = useRef(true)
    useEffect(() => {
        isInitialRender.current = false
    }, [])
    return isInitialRender.current
}

const CSSTransition: FC<Props> = ({
    show,
    enter,
    enterStart,
    enterEnd,
    leave,
    leaveStart,
    leaveEnd,
    appear,
    unmountOnExit,
    tag,
    children,
    ...rest
}) => {
    const enterClasses = enter.split(' ').filter(s => s.length)
    const enterStartClasses = enterStart.split(' ').filter(s => s.length)
    const enterEndClasses = enterEnd.split(' ').filter(s => s.length)
    const leaveClasses = leave.split(' ').filter(s => s.length)
    const leaveStartClasses = leaveStart.split(' ').filter(s => s.length)
    const leaveEndClasses = leaveEnd.split(' ').filter(s => s.length)
    const removeFromDom = unmountOnExit

    function addClasses(node: any, classes: Array<string>) {
        return classes.length && node.classList.add(...classes)
    }

    function removeClasses(node: any, classes: Array<string>) {
        return classes.length && node.classList.remove(...classes)
    }

    const nodeRef = React.useRef<any>(null)
    const Component = tag

    return (
        <ReactCSSTransition
            appear={appear}
            nodeRef={nodeRef}
            unmountOnExit={removeFromDom}
            in={show}
            addEndListener={(done: HTMLElement) => {
                if (nodeRef && 'current' in nodeRef)
                    nodeRef.current?.addEventListener(
                        'transitionend',
                        done,
                        false,
                    )
            }}
            onEnter={() => {
                if (!removeFromDom && nodeRef.current)
                    nodeRef.current.style.display = null

                addClasses(nodeRef.current, [
                    ...enterClasses,
                    ...enterStartClasses,
                ])
            }}
            onEntering={() => {
                removeClasses(nodeRef.current, enterStartClasses)
                addClasses(nodeRef.current, enterEndClasses)
            }}
            onEntered={() => {
                removeClasses(nodeRef.current, [
                    ...enterEndClasses,
                    ...enterClasses,
                ])
            }}
            onExit={() => {
                addClasses(nodeRef.current, [
                    ...leaveClasses,
                    ...leaveStartClasses,
                ])
            }}
            onExiting={() => {
                removeClasses(nodeRef.current, leaveStartClasses)
                addClasses(nodeRef.current, leaveEndClasses)
            }}
            onExited={() => {
                removeClasses(nodeRef.current, [
                    ...leaveEndClasses,
                    ...leaveClasses,
                ])
                if (!removeFromDom && nodeRef.current)
                    nodeRef.current.style.display = 'none'
            }}>
            <Component
                ref={nodeRef}
                {...rest}
                style={{ display: !removeFromDom ? 'none' : null }}>
                {children}
            </Component>
        </ReactCSSTransition>
    )
}

const Transition: FC<Props> = ({ show, appear, ...rest }) => {
    const { parent } = useContext(TransitionContext)
    const isInitialRender = useIsInitialRender()
    const isChild = show === undefined

    if (isChild) {
        return (
            <CSSTransition
                appear={parent.appear}
                show={parent.show}
                {...rest}
            />
        )
    }

    return (
        <TransitionContext.Provider
            value={{
                parent: {
                    show,
                    isInitialRender,
                    appear,
                },
            }}>
            <CSSTransition appear={appear} show={show} {...rest} />
        </TransitionContext.Provider>
    )
}

export default Transition
