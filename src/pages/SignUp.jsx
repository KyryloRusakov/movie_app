import { useNavigate } from 'react-router-dom';
import { useAuth } from 'components/hook/useAuth';
import UserForm from 'components/UserForm';

const SignUp = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();

  const onSubmit = async (data) => {
    const { name, email } = data;
    try {
      const response = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        signin({ name, email }, () => navigate('/movies'), true);
      } else {
        console.error('Error creating user:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div className="container">
      <UserForm onSubmit={onSubmit} btnName="Sign Up" />
    </div>
  );
};

export default SignUp;
