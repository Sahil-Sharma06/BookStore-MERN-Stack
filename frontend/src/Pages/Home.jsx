import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';

function Home() {
     const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='p-4'>
        <div className="flex items-center justify-between">
            <h1 className='my-8 text-3xl'>Book List</h1>
            <Link to='/books/create' target='_blank'>
                <MdOutlineAddBox className='text-3xl text-sky-800'/>
            </Link>
        </div>
        {loading ? (
            <Spinner/>
        ):(
            <table className='w-full border-separate border-spacing-2'>
                <thead>
                    <tr>
                        <th className='border rounded-md border-slate-600'>No</th>
                        <th className='border rounded-md border-slate-600'>Title</th>
                        <th className='border rounded-md border-slate-600 max-md:hidden'>Author</th>
                        <th className='border rounded-md border-slate-600 max-md:hidden'>Publish Year</th>
                        <th className='border rounded-md border-slate-600'>Operations</th>
                    </tr>
                </thead>
                <tbody>
  {books.map((book, index) => (
    <tr key={book._id} className='h-8'>
      <td className='text-center border rounded-md border-slate-700'>{index + 1}</td>
      <td className='text-center border rounded-md border-slate-700'>{book.title}</td>
      <td className='text-center border rounded-md border-slate-700'>{book.author}</td>
      <td className='text-center border rounded-md border-slate-700'>{book.publishYear}</td>
      <td className='text-center border rounded-md border-slate-700'>
        <div className="flex justify-center gap-x-4">
          <Link to={`/books/details/${book._id}`} target='_blank'>
            <BsInfoCircle className='text-2xl text-green-200'/>
          </Link>
          <Link to={`/books/edit/${book._id}`} target='_blank'>
            <AiOutlineEdit className='text-2xl text-yellow-600'/>
          </Link>
          <Link to={`/books/delete/${book._id}`} target='_blank'>
            <MdOutlineDelete className='text-2xl text-red-600'/>
          </Link>
        </div>
      </td>
    </tr>
  ))}
</tbody>

            </table>
        )
        }
  </div>
  )
}

export default Home
