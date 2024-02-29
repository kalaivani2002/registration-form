'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
function EditUser({ params }) {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: '',
        phone: ''
    });

    const router = useRouter()
    useEffect(() => {
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            const userData = JSON.parse(storedData);
            const id = params.slug[0]; // Assuming params.slug[0] is the ID
            const objectWithId = userData.find(item => item.id == id);
            if (objectWithId) {
                setFormData(objectWithId);
            }
        }
    }, [params.slug]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser(params.slug)
        // Implement your logic to handle the form submission, e.g., sending data to the server
    };
    const updateUser = (id) => {
      // Find the index of the user with the given ID in localStorage
      const storedData = localStorage.getItem('userData');
      if (storedData) {
          const userData = JSON.parse(storedData);
          const index = userData.findIndex(user => user.id == id);
          
          if (index !== -1) {
              // Update the user data in localStorage
              const updatedUserData = [...userData];
              updatedUserData[index] = formData; // Assuming formData contains updated user data
              localStorage.setItem('userData', JSON.stringify(updatedUserData));
              router.push('/')
          } else {
              console.error(`User with ID ${id} not found in localStorage.`);
          }
      } else {
          console.error('No user data found in localStorage.');
      }
  };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
            id:parseInt(params.slug[0])
        }));
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Edit User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                        DOB:
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email:
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                        Phone:
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                   
                >
                    Update User
                </button>
            </form>
        </div>
    );
}

export default EditUser;
