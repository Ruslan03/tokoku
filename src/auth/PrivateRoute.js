import React from 'react'
import { Redirect, Route } from 'react-router'
import { useSelector } from 'react-redux'
import BlockUI from '../components/BlockUI'

const PrivateRoute = ({ component: Component, ...rest }) => {
    
    const { isLogin, isWaitingAuth } = useSelector(state => state.user)
    
    return (
        <Route
            {...rest}
            render = { props => {

                if(isWaitingAuth) return <BlockUI />
                return isLogin ? <Component {...props} />: <Redirect to="/login" />
            }}
        />
    )
}

export default PrivateRoute
