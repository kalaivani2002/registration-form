"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

function AddUser() {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        email: '',
        phone: ''
    });
    const router = useRouter()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Calculate age
        const age = calculateAge(formData.dob);

        // Construct JSON object from form data including age
        const userData = {
            name: formData.name,
            dob: formData.dob,
            age: age,
            email: formData.email,
            phone: formData.phone
        };
        let storedData = JSON.parse(localStorage.getItem('userData')) || [];
     if(storedData){
         userData['id'] = storedData.length+1
     }
     else{
        userData['id'] = 1;
     }
     storedData.push(userData)
     localStorage.setItem('userData',JSON.stringify(storedData))
     router.push('/')
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white border rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-6">Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name:
                    </label>
                    <input
                        className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="name"
                        //   value={formData.name}
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
                        //   value={formData.dob}
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
                        //   value={formData.email}
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
                        //   value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Add User
                </button>
            </form>
        </div>
    );
}

export default AddUser;
