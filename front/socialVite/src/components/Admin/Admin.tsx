import React, { useEffect, useState } from 'react'
import './Admin.module.scss'
import { authAPI } from '../api/api'
import { Button, Table } from 'antd'
import Column from 'antd/es/table/Column'

type UserType = {
  id:number
  login:string,
  username:string
}

export const Admin = () => {
  const [users, setUsers] = useState<UserType[]>([])

  if(!JSON.parse(localStorage.getItem('user') || '{}')?.login?.login || JSON.parse(localStorage.getItem('user') || '{}')?.login?.login !== 'admin') window.location.replace('/')
  useEffect(() => {
    authAPI.getAllUsers().then(e => setUsers(e.data))
  }, [])
  const handleDelete = async (record:any) => {
    try {
      await authAPI.removeUser(record.login);
      const updatedHistory = await authAPI.getAllUsers();
      setUsers(updatedHistory.data);
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };
  return (
    <div className='adminContainer'>
        <Table dataSource={users}>
          <Column title={'ID'} dataIndex={'id'} key={'id'}/>
          <Column title={'Логин'} dataIndex={'login'} key={'login'}/>
          <Column title={'Имя Пользователя'} dataIndex={'username'} key={'username'}/>
          <Column title={'Действия'} render={(text, record) => (
                  <>
                    <Button type="dashed" onClick={() => handleDelete(record)}>
                      Удалить
                    </Button>
                  </>
                  )} key={'actions'}/>
        </Table>
    </div>
  )
}
