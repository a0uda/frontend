import React from 'react'
import Button from './Button'


const SearchBarCompRow = ({ userArr, onDelete }) => {
  return (

    <tr>
      <td>{userArr.username}</td>
      <td>{userArr.firstname} {userArr.lastname}</td>
      <td className='col_1'>{userArr.email}</td>
      <td className='col_1'>{userArr.role}</td>
      <td>
        <Button onClick={() => onDelete(userArr.username)} buttText={'Delete'} />
      </td>
    </tr>


  );
};


export default SearchBarCompRow;
