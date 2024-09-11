import React, { useState } from 'react'
import {useFormik} from 'formik'
import { authAPI } from '../api/api'
import './Registration.modul.scss'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { registration } from '../../redux/action/action'
import { message } from 'antd'

const Registration = () => {
    // const [error, setError] = useState()
    const dispatch = useDispatch()
    const { loading, error, login } = useSelector((state) => state.user)
    const formik = useFormik({
        initialValues:{
            'login': '',
            'password': '',
            'name': '',
            'surname': '',
            'description': '',
        },
        onSubmit: (values) => {
            dispatch(registration(values))
        }
    })
    if (loading) {
        console.log(loading);
    }
    if (error){
        message.error(error)
    }
    console.log(login);
    return (
        <div className='divRegistration'>
            <Helmet>
                <title>Регистрация</title>
            </Helmet>
            <div className={'image'}>
                    <img src={'Devices1.png'} alt={'Oops'} width={890} />
                </div>
            <form onSubmit={formik.handleSubmit}>
                <h1>Добро пожаловать!</h1>
                <input placeholder={'Login'} {...formik.getFieldProps('login')}/>
                <input placeholder={'Password'} type={'password'} {...formik.getFieldProps('password')}/>
                <input placeholder={'Name'} type={'text'} {...formik.getFieldProps('name')}/>
                <input placeholder={'Surname'} type={'text'} {...formik.getFieldProps('surname')}/>
                <textarea placeholder={'Description'} {...formik.getFieldProps('description')}/>
                <button type={'submit'} disabled={loading}>
                    {loading ? 'Подождите....' : 'Зарегестрироваться'}
                </button>
                <h>Уже есть аккаунт? <a href={'/login'}>Войдите!</a></h>
            </form>
        </div>
    )
}

export default Registration