import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { registrationUser } from 'redux/authentification/authentification.reduces'
import css from "./Registration.module.css"
import { selectIsError, selectIsLoading } from 'redux/authentification/authentification.selectors'
import Loader from 'components/Loader/Loader'

const Registration = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectIsError)

  const hendleSubmit= (e) => {
    e.preventDefault()
    const email = e.currentTarget.elements.email.value
    const password = e.currentTarget.elements.password.value
    const name = e.currentTarget.elements.name.value

    const formData = {
      email,
      password,
      name
    }

    dispatch(registrationUser(formData))

  }

  return (
   <>
    {isLoading && <Loader />}
    <form onSubmit={hendleSubmit} className={css.formContainer}>
      <h2 className={css.titleRegist}>Registration</h2>
    <input type="text" name="name" placeholder="Name" className={css.inputField} />
    <input type="text" name="email" placeholder="Username" className={css.inputField} />
    <input type="password" name="password" placeholder="Password" className={css.inputField} />
    <button type="submit" className={css.submitButton}>Sign Up</button>
  </form>
  </>
  )
}

export default Registration