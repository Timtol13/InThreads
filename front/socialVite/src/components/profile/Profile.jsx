import React, { useEffect, useState } from 'react'
import { ChangeProfileAPI, authAPI } from '../api/api'
import './Profile.modul.scss'
import { useParams } from 'react-router'
import { Modal } from 'antd'
import { Helmet } from 'react-helmet'
import UsersNews from '../UsersNews/UsersNews'

const style = {
    width: '100%',
    paddingTop: '40px',
    bgcolor: '#fff',
    boxShadow: 24,
    borderRadius: 3,
};

function Profile() {
    const [user, setUser] = useState({})
    const userStorage = JSON.parse(localStorage.getItem('user')).login
    const { login } = useParams()
    const [photo, setPhoto] = useState('')
    const [file, setFile] = useState(null);
    const [res, setRes] = useState(null)
    useEffect(()=>{
        authAPI.getUser(login).then(e => {setUser(e.data[0])})
        authAPI.getPhoto(login).then(e => {setPhoto(`http://localhost:7653/images/${login}/${e.data[0]?.filename}`)})
        setRes(photo)
    }, [])
    const uploadHandler = (event) => {
        setFile(event.target.files[0]);
        console.log(event.target.files[0])
        authAPI.sendPhoto({'login': login, 'status': 'main', 'files': event.target.files[0]}).then(() => {window.location.reload()})
    };
    
    const [open, setOpen] = useState(false)
    const [type, setType] = useState('')
    const [Name, setName] = useState('')
    const [Surname, setSurname] = useState('')
    const [Description, setDescription] = useState('')
    const handlerOpen = () => setOpen(true)
    const handlerClose = () => setOpen(false)
    useEffect(() => {
        setName(user.username);
        setSurname(user.surname);
        setDescription(user.description);
    }, [user])
    const profileTitle = `Профиль ${Name}`
    const [toggle, setToggle] = useState(false)
    return (
        <div className={'profile element'}>
            <div className={'profile_container'}>
                <Helmet>
                    <title>{ profileTitle }</title>
                </Helmet>
                <div className={'firstBlock'}>
                    <div className={'profile_photo'}  style={ { border: userStorage.login !== login? user?.status !== "offline"? '5px solid #F52E5C' : '5px solid #000' : '' } }>
                        <div className={'frame'}>
                            <img src={photo} alt=''/>
                        </div>
                    
                    </div>
                   
                </div>
                
                <div className={'profile_info'}>
                    <h2>{Name} {Surname}</h2>
                    <p style={{ overflow: !toggle? 'hidden' : 'visible', maxHeight: !toggle? '50px': '2500px', transition: 'max-height .4s'}}>
                        <button className='open_description' onClick={() => {setToggle(!toggle)}}>
                            {!toggle? '↓' : '↑'}
                        </button>
                        {Description}
                    </p>
                    <div className='buttons'>
                    {userStorage.login === login? 
                        <>
                            <button onClick={() => {handlerOpen(); setType('name');}}>Редактировать имя</button>
                            <button onClick={() => {handlerOpen(); setType('description');}}>Редактировать описание</button>
                            <label className={'input_file'} htmlFor="button-photo">
                                <span>Редактировать фото</span>
                                <input type="file"
                                    accept="image/*"
                                    className={'files'}
                                    id="button-photo"
                                    onChange={(e) => {uploadHandler(e)}}
                                    />
                            </label>
                            
                        </>
                    : <>
                        <a href={`/chat/${login}`}> <img src={'/Message.png'} alt={'Oops'} width={20} height={20} />Написать</a>
                        <a href={`/photos/${login}`}><img src={'/Photo.png'} alt={'Oops'} height={20} />Фото {Name}</a>
                    </>}
                    </div>
                </div>
                
                <Modal 
                    open={open}
                    onCancel={handlerClose}
                    onOk={type === 'name'? () => {
                        ChangeProfileAPI.putName({'name': Name, 'surname': Surname, 'login': userStorage.login}).catch(() => {console.log('error')}).then(() => {handlerClose()})
                    } : () => {
                        ChangeProfileAPI.putDescription({'description': Description, 'login': userStorage.login}).catch(() => {console.log('error')}).then(() => {handlerClose()})
                    }}
                    >
                    <div style={style}>
                        {type === 'name'?
                        <div className={'change changeName'}>
                            <input value={Name} onChange={e => {setName(e.target.value)}}/>
                            <input value={Surname} onChange={e => {setSurname(e.target.value)}}/>
                        </div> 
                        : 
                        <div className={'change changeDescription'}>
                            <textarea value={Description} onChange={e => {setDescription(e.target.value)}}>
                            </textarea>
                        </div> 
                        }
                    </div>
                </Modal>
            </div>
            <div className={'posts'}>
                <UsersNews user={login} name={Name} surname={Surname}/>
            </div>
        </div>
    )
}

export default Profile;