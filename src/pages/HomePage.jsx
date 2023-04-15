import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

const HomePage = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: 'Ayomide',
      lastName: 'Dosunmu',
      present: false,
    },
    {
      id: 2,
      firstName: 'Abraham',
      lastName: 'Amouzouvi',
      present: false,
    },
    {
      id: 3,
      firstName: 'Joseph',
      lastName: 'Akele',
      present: false,
    },
    {
      id: 4,
      firstName: 'Odunayo',
      lastName: 'Dosunmu',
      present: false,
    },
    {
      id: 5,
      firstName: 'Femi',
      lastName: 'Adeniran',
      present: false,
    },
  ])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [filteredStudent, setFilteredStudent] = useState('')
  // const [firstName, setFirstName] = useState('')
  // const [lastName, setLastName] = useState('')
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    if (filteredStudent === "") {
      setFilteredStudents(students);
    }
  }, [students, filteredStudent]);

  const onSubmit = (data) => {
    const newStudent = {
      id: students.length === 0 ? 1 : students[students.length - 1].id + 1,
      firstName: data.firstName,
      lastName: data.lastName,
      present: true,
    }
    setStudents([...students, newStudent])
    reset()
  }

  const availability = (id) => {
    setStudents(
      students.map(student => student.id === id ? {...student, present: !student.present} : student)
    )
  }

  const filteredArray = students.filter((student) => {
    return student.firstName.toLowerCase().includes(filteredStudent.toLowerCase()) || student.lastName.toLowerCase().includes(filteredStudent.toLowerCase());
  });

  const handleFilter = (event) => {
    setFilteredStudent(event.target.value)
    console.log(filteredStudent)
    setFilteredStudents(filteredArray)
  }

  return (
    <div className='py-10 md:px-[80px] px-4'>
      <h1 className="font-bold md:text-4xl text-2xl text-center md:mb-10 mb-6">OLIFI SUNDAY SCHOOL ATTENDANCE</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-row flex-col md:gap-10 gap-4 md:justify-center md:items-center">
        <input type="text" className="border p-2 rounded-lg" placeholder='Enter First Name...' {...register('firstName')} />
        <input type="text" className="border p-2 rounded-lg" placeholder='Enter Last Name...' {...register('lastName')} />
        <button className='px-6 py-2 bg-blue-800 rounded-lg text-white'>Add Student</button>
      </form>
      <div className='flex flex-col items-center mt-10 gap-2'>
        <div className="flex md:w-[30%] w-full justify-between items-center">
          <h2 className="text-xl font-medium">Total Number of Students:</h2>
          <span className="text-2xl font-bold">{students.length}</span>
        </div>
        <div className="flex md:w-[30%] w-full justify-between items-center">
          <h2 className="text-xl font-medium">Total Number of Students present:</h2>
          <span className="text-2xl font-bold">{students.filter(student => student.present === true).length}</span>
        </div>
        <div className="flex md:w-[30%] w-full justify-between items-center">
          <h2 className="text-xl font-medium">Total Number of Students absent:</h2>
          <span className="text-2xl font-bold">{students.filter(student => student.present === false).length}</span>
        </div>
      </div>
      <div className="mt-10 flex flex-col w-full items-center border-t pt-10">
        <div className="flex items-center justify-between md:w-[50%] w-full mb-10">
          <h1 className="font-bold md:text-4xl text-2xl text-center">Students</h1>
          <input type="text" className="border p-2 rounded-lg" placeholder='Search for Student...' value={filteredStudent} onChange={handleFilter} />
        </div>
        <ol className='list-decimal list-inside md:w-[50%] w-full flex flex-col gap-4 h-[200px] overflow-hidden overflow-y-auto pr-4'>
          {
            filteredStudents.map(student => (
              <li className='text-md flex items-center justify-between'>
                <p className="font-medium text-xl">
                  {student.lastName} {student.firstName}
                </p>
                <button onClick={() => availability(student.id)} className={`${student.present ? 'bg-red-600' : 'bg-green-600'} py-2 px-4 rounded-md`}>
                  {student.present ? 'Mark as Absent' : 'Mark as Present'}
                </button>
              </li>
            ))
          }
        </ol>

      </div>
    </div>
  )
}

export default HomePage