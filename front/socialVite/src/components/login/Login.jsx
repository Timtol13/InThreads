import React, {useState} from 'react'
import {useFormik} from 'formik'
import './Login.modul.scss'
import {Helmet} from "react-helmet";
import { useDispatch, useSelector } from 'react-redux'
import { login as loginAction } from '../../redux/action/action';
import { message } from 'antd';

function Login() {
    const dispatch = useDispatch();
    const { login, loading, error } = useSelector((state) => state.user)
    const formik = useFormik({
        initialValues:{
            login: '',
            password: ''
        },
        onSubmit: (values) => {
            dispatch(loginAction(values.login, values.password));
        }
    })
    if (loading){
        console.log('Please wait')
    }

    error && message.error(error)

    return (
        <div className='divLogin'>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <img src={'Devices1.png'} alt={'Oops'} width={890} />
            <form onSubmit={formik.handleSubmit}>
                <h1>С возвращением!</h1>
                <input placeholder={'Логин'} {...formik.getFieldProps('login')}/>
                <input placeholder={'Пароль'} type={'password'} {...formik.getFieldProps('password')}/>
                <button type={'submit'} disabled={loading}>
                    {loading ? 'Вход...' : 'Войти'}
                </button>
                <h5>Ещё нет аккаунта? <a href={'/registration'}>Зарегестрируйтесь!</a></h5>
            </form>
        </div>
    )
}

export default Login;