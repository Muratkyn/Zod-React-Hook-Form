import React from 'react';
import Form from './Form';

function App() {
  return (
    <div className="max-w-xl mx-auto w-full">
      <div className="flex justify-center my-12">
        <div className="w-full lg:12 bg-blue-100 p-5 rounded-lg shadow-xl">
          <h3 className="pt-4 text-2xl text-center font-bold">
            Create New Account
          </h3>
          <Form />
        </div>
      </div>
    </div>
  );
}

export default App;
