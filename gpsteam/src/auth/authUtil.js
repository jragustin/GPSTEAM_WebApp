import React from 'react'
import { TextField } from 'material-ui'
import gql from 'graphql-tag';

//export this for the login textfield
export const renderTextField = ({
    input,
    label,
    placeholder,
    meta: { touched, error },
    ...custom
}) => (
    <TextField 
        margin='dense'
        fullWidth
        label={label}
        placeholder={placeholder}
        InputLabelProps={{ shrink: true }}
        InputProps={{ style: {fontSize: 25}} }
        error={touched && error ? true : false}
        helperText={touched && error ? error : ''}
        {...input}
        {...custom}/>
)
//use the Local storage to make token
export function setLocalStorageTokens(token, refreshToken) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("token", token)
        localStorage.setItem("refreshToken", refreshToken)
    } else {
        window.alert('local storage not supported, you cant login using this device.')
        // Sorry! No Web Storage support..
    }
}

//this function 
export function tryLogin(data, mutate) {
    mutate({
        variables: {
            username: data.username, 
            password: data.password
        }
    }).then((d) => {//
        // successfully logged in
        // alert(`${JSON.stringify(d, null, 2)}`)
        setLocalStorageTokens(d.data.login.token, d.data.login.refreshToken)
        window.location.reload();
    }).catch((msg) => {
        console.log(msg)
        window.alert(msg.graphQLErrors[0].message)
    })
}
//this is a query to update the server-side
// any operations that cause writes should be sent explicitly via a 'mutation'
//this mutation returns token and refreshToken
export const loginQuery = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            refreshToken
        }
    }
`
