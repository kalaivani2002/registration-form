'use client';
import React from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import { PrimeReactProvider } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Pane, Text, majorScale, Dialog, toaster } from 'evergreen-ui';
import Swal from 'sweetalert2';

// import DefaultDialogExample from './viewUser/page';
import Modal from '@/component/modal/modal';
// import { Button, Pane, Text, majorScale } from 'evergreen-ui'
// import "primereact/resources/themes/lara-light-cyan/theme.css";



// const yourData = [
//   { id: 1, name: 'John Doe',dob:'2024-02-29', age: 30, city: 'New York', email: 'johndoe@gmail.com', phone: '' },
// ];


function FormTable() {



  const [selectedRow, setSelectedRow] = React.useState(null);
  const [data, setData] = useState();
  const [userData, setUserData] = useState('');

  const [isShown, setIsShown] = React.useState(false)
  const [viewId, setviewId] = useState('')

  const router = useRouter();

  useEffect(() => {
    let previousData = JSON.parse(localStorage.getItem('userData'))
    // localStorage.setItem('userData',JSON.stringify(yourData))
    if (previousData) {
      previousData.forEach(e => {
        e.age = calculateAge(e.dob);
      });
    }

    setData(previousData);
  }, [])


  const addRow = () => {
    // Implement your edit logic here
    router.push('/addUser');
  };

  const deletePopup = (rowData) => {
    Swal.fire({
      title: "Are you sure to delete this?",
      icon: "error",
      confirmButtonText: "Yes",
      cancelButtonText: "cancel",
      showCancelButton: true,
      showCloseButton: true
    }).then((e) => {
      console.log(e, "kalai");
      if (e.isConfirmed) {
        // console.log("");
        deleteRow(rowData);
      }
    });
  }

  const deleteRow = (rowData) => {
    const updatedData = data.filter((row) => row.id !== rowData.id);
    setData(updatedData);
    setSelectedRow(null);
    console.log('updatedData', updatedData, selectedRow);
    localStorage.setItem('userData', JSON.stringify(updatedData))
    toaster.success('User deleted successfully')
  };

  const editRow = (rowData) => {
    setviewId(rowData.id)
    router.push('/edit/' + rowData.id)
  };


  const viewRow = (rowData) => {
    setIsShown(true)
    console.log('View:', rowData);
    setUserData(`
    <div className="space-y-2">
                        <p>Name: ${rowData?.name}</p>
                        <p>Age: ${rowData?.age}</p>
                        <p>Email: ${rowData?.email}</p>
                        <p>Phone: ${rowData?.phone}</p>
                    </div>
    `);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const actionTemplate = (rowData) => (

    <div>
      {/* <Button label="Submit" icon="pi pi-check" /> */}
      <Button icon="pi pi-eye" className="p-button-rounded p-button-info p-mr-2" onClick={() => viewRow(rowData)} />
      <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning p-mr-2" onClick={() => editRow(rowData)} />
      <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => deletePopup(rowData)} />
    </div>
  );

  return (
    <>
      <div className="flex justify-end p-5">
        <Button label="Add" className={`focus:outline-none text-white bg-blue-700 hover:bg-blue-800 
     focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
     dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900`} icon="pi pi-plus" onClick={() => addRow()} />
      </div>

      <DataTable value={data}>

        <Column field="name" header="Name" />
        <Column field="age" header="Age" />
        <Column field="email" header="Email" />
        <Column field="phone" header="Phone" />
        {/* <Column field="confirm" header="Confirmed" /> */}
        <Column body={actionTemplate} header="Actions" />
      </DataTable>
      <Pane>
        <Dialog
          isShown={isShown}
          title="User Details"
          confirmLabel="Edit"
          onCloseComplete={() => setIsShown(false)}
          hasFooter={false}
        >
          <div dangerouslySetInnerHTML={{ __html: userData }} />
        </Dialog>
      </Pane>

    </>
  );
}

export default FormTable;