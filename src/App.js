import './App.css';
import {useForm} from 'react-hook-form';


function App() {
  const {
    register,
    formState: {
      errors,
    },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    alert(JSON.stringify(data))
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          First Name:
          <input {...register('firstName')} />
        </label>

        <input type='submit' />
      </form>
    </div>
  );
}

export default App;
